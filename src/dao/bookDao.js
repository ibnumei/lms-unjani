const { bookBean } = require('../db/index');
const tool = require('../util/ServerTool');
const { Sequelize } = require('../db');

class BookDao {
  static getBook(where) {
    return bookBean.findAndCountAll({
      limit: where.limit,
      offset: where.offset,
      where: where.condition
    });
  }

  static getSingleBook(id) {
    return bookBean.findOne({ where: { id_book: id } });
  }
}

module.exports = BookDao;
