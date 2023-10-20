const { bookBean } = require('../db/index');
const tool = require('../util/ServerTool');

class BookDao {
  static getBook() {
    return bookBean.findAll();
  }

  static getSingleBook(id) {
    return bookBean.findOne({ where: { id } });
  }
}

module.exports = BookDao;
