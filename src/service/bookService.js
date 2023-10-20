const { bookDao } = require('../dao/index');

// Pada level Service, penambalian harus berupa real object, non promise

class BookService {
  /* ----------  User Management  ----------*/
  static async getBook() {
    console.log('BoookService.getBook');

    return bookDao.getBook();
  }

  static async getSingleBook(id) {
    console.log('BookService.getSingleBook', id);

    return bookDao.getSingleBook(id);
  }
}

module.exports = BookService;
