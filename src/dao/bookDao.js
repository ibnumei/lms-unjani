const { bookBean, authorBean, itemBean } = require('../db/index');
const tool = require('../util/ServerTool');
const { Sequelize } = require('../db');

class BookDao {
  static getBook(where, order) {
    return bookBean.findAndCountAll({
      limit: where.limit,
      offset: where.offset,
      where: where.condition,
      order
    });
  }

  static updateItem(where, itemToUpdate, transaction) {
    return itemBean.update(itemToUpdate, { where, raw: true, transaction });
  }

  static findOneBook(where, transaction) {
    return bookBean.findOne({ where, transaction });
  }

  static getSingleBook(id, transaction) {
    return bookBean.findOne({ 
      where: { id_book: id } ,
      include: [
        {
          model: authorBean,
          as: 'authors'
        },
        {
          model: itemBean,
          as: 'items'
        }
      ],
      transaction
    });
  }
}

module.exports = BookDao;
