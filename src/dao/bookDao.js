const { bukuBean } = require('../db/index');
const tool = require('../util/ServerTool');

class BookDao {
  static getBook() {
    return bukuBean.findAll();
  }

  static getSingleBook(id) {
    return bukuBean.findOne({ where: { id } });
  }
}

module.exports = BookDao;
