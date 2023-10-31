const { bookBean, itemBean, authorBean, rentBean } = require('../db/index');
const {bulkInsertUpdate} = require('../util/ServerTool');
const { Sequelize } = require('../db');
const { Op } = require('sequelize');

class RentDao {
  static searchRentBook(title, itemCode, transaction) {
    return bookBean.findOne({ 
      where: { title } ,
      rew: true,
      include: [
        {
            model: authorBean,
            as: 'authors'
        },
        {
          model: itemBean,
          as: 'items',
          where: { item_code: itemCode}
        }
      ],
      transaction
    });
  }

  static rentBook(newPayload, transaction) {
    const attributes = ['id', 'kode_pinjam', 'id_member', 'id_book', 'id_item_stock', 'tgl_pinjam', 'status_pinjam', 'createdBy'];
      return bulkInsertUpdate(rentBean, newPayload, attributes, transaction)
  }

  static searchItems(itemsCode, transaction) {
    return itemBean.findAll({
      where: {  
        item_code: {
          [Op.in]: itemsCode
        }
      },
      transaction
    })
  }

  static updateItems(stock, item_code, transaction) {
    return itemBean.update(
      { stock: stock },
      {
        where: {
          item_code
        },
      },
      transaction
    )
  }

}

module.exports = RentDao;
