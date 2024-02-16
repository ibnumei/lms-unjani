const { rentDao } = require('../dao/index');
const { v4: uuidv4 } = require('uuid');
const { clone } = require('../util/ServerTool');
const { itemStatus } = require('../util/Enums');


class RentService {
  static async searchRentBook(whereBook, whereItems, transaction, fromReturn = false) {
    let result = await rentDao.searchRentBook(whereBook, whereItems, transaction);

    if (!result) {
      throw new Error('Fail to search rent book')
    }

    result.items.forEach(item => {
      if (item.status === !itemStatus.AVAILABLE && !fromReturn) {
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
    }
    await rentDao.rentBook(newPayload, transaction);
    const type = 'rent';
    await this.updateItems(payload, type, transaction);
    return uuid;
  }

  static async returnBook(payload, currentUser, transaction) {
    const { kode_pinjam } = payload;
    const where = {
      kode_pinjam: kode_pinjam,
      status_pinjam: true
    }
    const attributes = ['kode_pinjam', 'item_code'];
    const dataRentBook = await rentDao.searchRentData(where, transaction, attributes);
    if (!dataRentBook.length) {
      throw new Error('Data Tidak ditemukan atau status sudah dikembalikan');
    }
    const type = 'return'
    await this.updateItems(dataRentBook, type, transaction)
    return rentDao.returnBook(kode_pinjam, currentUser.member_name, transaction);
  }

  static async updateItems(payload, type, transaction) {
    let itemsCode = []
    payload.forEach((data) => {
      itemsCode.push(data.item_code)
    })
    const itemBook = await rentDao.searchItems(itemsCode)
    const newItemBook = clone(itemBook)
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
      const whereBook = { id_book: file.id_book };
      const whereItems = { item_code: file.item_code };
      const tempBook = await this.searchRentBook(whereBook, whereItems, transaction, true);
      book.push(tempBook)
    }
    return book;
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
}

module.exports = RentService;
