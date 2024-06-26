const axios = require('axios');
const FormData = require('form-data');
const { rentDao, userDao } = require('../dao/index');
const { v4: uuidv4 } = require('uuid');
const { clone } = require('../util/ServerTool');
const { itemStatus } = require('../util/Enums');

const API_ROUTE = (type) => `https://deltalibrary.unjani.id/index.php?p=api/loan/${type}`

class RentService {
  static async searchRentBook( whereItems, transaction, fromReturn = false) {
    let result = await rentDao.searchRentBook( whereItems, transaction);

    if (!result) {
      throw new Error('Fail to search rent book')
    }

    result.items.forEach(item => {
      if (item.status !== itemStatus.AVAILABLE && !fromReturn) {
        throw new Error('Buku yang dicari saat ini tidak tersedia')
      }
    })

    let tempAuthor = '';
    if (Object.keys(result.authors).length > 0) {
      result.authors.forEach((author) => {
        tempAuthor = tempAuthor + `${author.author_name} `;
      })
    }
    result.dataValues.fullAuthor = tempAuthor;
    return result;
  }

  static async rentBook(payload, currentUser, transaction) {
    const uuid = uuidv4();
    if (payload.length > 2) {
      throw new Error('Peminjaman tidak boleh lebih dari 2 buku');
    }
    const newPayload = [
      {
        kode_pinjam: uuid,
        id_member: currentUser.id,
        id_book: payload[0].id_book,
        item_code: payload[0].item_code,
        tgl_pinjam: new Date(),
        status_pinjam: true,
        createdBy: currentUser.member_name
      }
      // {
      //   kode_pinjam: uuid,
      //   id_member:  currentUser.id,
      //   id_book: payload[1].id_book,
      //   item_code: payload[1].item_code,
      //   tgl_pinjam: new Date(),
      //   status_pinjam: true,
      //   createdBy: currentUser.member_name
      // }
    ]

    const form = new FormData()
    form.append('member_key', currentUser.member_id)
    form.append('item_code[]', payload[0].item_code)

    if (payload.length > 1) {
      const secondPayload = {
        kode_pinjam: uuid,
        id_member: currentUser.id,
        id_book: payload[1].id_book,
        item_code: payload[1].item_code,
        tgl_pinjam: new Date(),
        status_pinjam: true,
        createdBy: currentUser.member_name
      }
      newPayload.push(secondPayload)

      form.append('item_code[]', payload[1].item_code)
    }

    await rentDao.rentBook(newPayload, transaction);
    await this.saveToOldService(form, 'loaning');

    //set bebas_pustaka false, specific member by id when rent books
    await userDao.setBebasPustaka([currentUser.id], transaction, false)

    const type = 'rent';
    await this.updateItems(payload, type, transaction);
    return uuid;
  }

  static async returnBook(payload, currentUser, transaction) {
    const {
      kode_pinjam,
      id_item_stock
    } = payload;
    const { member_name } = currentUser
    const where = {
      kode_pinjam,
      id_item_stock,
      status_pinjam: true
    }
    const attributes = ['kode_pinjam', 'item_code', 'id_member'];
    const dataRentBook = await rentDao.searchRentData(where, transaction, attributes);
    if (!dataRentBook.length) {
      throw new Error('Data Tidak ditemukan atau status sudah dikembalikan');
    }

    await rentDao.returnBook(kode_pinjam, id_item_stock, member_name, transaction);

    const form = new FormData()
    form.append('member_key', currentUser.member_id)
    dataRentBook.forEach(rentBook => {
      form.append('item_code[]', rentBook.item_code)
    })

    await this.saveToOldService(form, 'return');

    await this.isMemberStillLoan(dataRentBook[0].id_member, transaction)
    return
  }

  static async updateItems(payload, type, transaction) {
    let itemsCode = []
    payload.forEach((data) => {
      itemsCode.push(data.item_code)
    })
    const itemBook = await rentDao.searchItems(itemsCode)
    const newItemBook = clone(itemBook)
    const statements = []
    newItemBook.forEach((data) => {
      if (type === 'rent' && data.status !== itemStatus.AVAILABLE) {
        throw new Error('Buku yang akan dipinjam saat ini tidak tersedia')
      }
    })
  }

  static async searchReturnBook(kode_pinjam, transaction) {
    const where = {
      kode_pinjam: kode_pinjam,
      status_pinjam: true
    }
    const attributes = ['kode_pinjam', 'item_code', 'id_book'];
    const dataRent = await rentDao.searchRentData(where, transaction, attributes);
    if (!dataRent.length) {
      throw new Error('Data Tidak ditemukan atau status sudah dikembalikan');
    }
    const book = []
    for (const file of dataRent) {
      // const whereBook = { id_book: file.id_book };
      const whereItems = { item_code: file.item_code };
      const tempBook = await this.searchRentBook(whereItems, transaction, true);
      book.push(tempBook)
    }
    return book;
  }

  static async isMemberStillLoan(id_member, transaction) {
    const attributes = ['id', 'status_pinjam'];
    const where = {
      id_member,
      status_pinjam: true
    }
    const memberRent = await rentDao.searchRentData(where, transaction, attributes)
    if (!memberRent.length) {
      return userDao.setBebasPustaka([id_member], transaction, true)
    }
    await userDao.setBebasPustaka([id_member], transaction, false)
    return
  }

  static async getListTransaction(page, size) {
    const actualOffset = page - 1;
    const { limit, offset } = this.getPagination(actualOffset, size);
    const where = {
      limit,
      offset,
    }
    const resultMember = await rentDao.getListTransaction(where);
    return this.getPagingData(resultMember, page, limit);
  }

  static getPagination(page, size) {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  };

  static getPagingData(data, page, limit) {
    const { count: totalItems, rows: transactions } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    // return { totalItems, transactions, totalPages, currentPage };
    return data
  };

  static async getReportTransaction(year) {
    return rentDao.getReportTransaction(year)
  }

  static async saveToOldService(form, type) {
    const formHeaders = form.getHeaders();
    return axios.post(API_ROUTE(type), form, {
      headers: {
        ...formHeaders
      }
    })
  }

  static async getQrInfo(kode_pinjam, transaction) {
    return rentDao.getQrInfo(kode_pinjam, transaction)
  }
}

module.exports = RentService;
