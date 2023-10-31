const { rentDao } = require('../dao/index');
const { v4: uuidv4 } = require('uuid');
const {clone} = require('../util/ServerTool');


class RentService {
  static async searchRentBook(title, itemCode, transaction) {
    let result = await rentDao.searchRentBook(title, itemCode, transaction);
    let tempAuthor = '';
    if(Object.keys(result.authors).length > 0)  {
      result.authors.forEach((author) => {
        tempAuthor = tempAuthor + `${author.author_name} `;
      })
    }
    result.dataValues.fullAuthor = tempAuthor;
    return result;
  }

  static async rentBook(payload, currentUser, transaction) {
    const uuid = uuidv4();
    const newPayload = [
      {
        kode_pinjam: uuid,
        id_member:  currentUser.id,
        id_book: payload[0].id_book,
        id_item_stock: payload[0].item_code,
        tgl_pinjam: new Date(),
        status_pinjam: true,
        createdBy: currentUser.member_name
      },
      {
        kode_pinjam: uuid,
        id_member:  currentUser.id,
        id_book: payload[1].id_book,
        id_item_stock: payload[1].item_code,
        tgl_pinjam: new Date(),
        status_pinjam: true,
        createdBy: currentUser.member_name
      }
    ]
    let itemsCode = []
    payload.forEach((data) => {
      itemsCode.push(data.item_code)
    })
    const itemBook = await rentDao.searchItems(itemsCode)
    await rentDao.rentBook(newPayload, transaction)
    const newItemBook = clone(itemBook)
    const statements = []
    newItemBook.forEach((data)=> {
      const newStock = data.stock - 1
      statements.push(rentDao.updateItems(newStock, data.item_code, transaction))
    })
    await Promise.all(statements);
    return uuid;
  }
}

module.exports = RentService;
