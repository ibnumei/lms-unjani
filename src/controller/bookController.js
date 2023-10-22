const { bookService } = require('../service/index');
const { logError } = require('../util/ServerTool');

class BookController {
  static async getBook(req, res) {
    try {
      const data = await bookService.getBook();
      res.json({ success: true, data });
    } catch (ex) {
      logError('BookController.getBook', ex);
      res.json({ success: false, message: 'Fail to get book', ex });
    }
  }

  static async getSingleBook(req, res) {
    try {
      const data = await bookService.getSingleBook(req.params.id);
      res.json({ success: true, data });
    } catch (ex) {
      logError('BookController.getSingleBook', ex);
      res.json({ success: false, message: 'Fail to get book', ex });
    }
  }

  static async syncBook(req, res) {
    const transaction = await sequelize.transaction();
    try {
      await bookService.syncBook(transaction);
      await transaction.commit();
      res.json({ success: true});
    } catch (ex) {
      logError('BookController.syncBook', ex);
      await transaction.rollback();
      res.json({ success: false, message: 'Fail to get syncBook', ex });
    }
  }
}

module.exports =BookController;
