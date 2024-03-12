const _ = require('lodash');
const { bookService } = require('../service/index');
const { logError } = require('../util/ServerTool');

class BookController {
  static async getBook(req, res) {
    try {
      const { page, size, title } = req.query;
      const sortBy = _.get(req, 'query.sortBy', null);
      const order = _.get(req, 'query.order', 'ASC');
      const data = await bookService.getBook(page, size, title, sortBy, order);
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
}

module.exports =BookController;
