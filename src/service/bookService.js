const _ = require('lodash');
const { bookDao } = require('../dao/index');
const { bookBean, itemBean, authorBean } = require('../db/index');
const axios = require('axios');
const { Sequelize } = require('../db');
const { Op } = Sequelize;
const DELTA_LIBRARY_API = process.env.DELTA_LIBRARY_API;
const DELTA_LIBRARY_SECRET =  process.env.DELTA_LIBRARY_SECRET;

class BookService {
  static async getBook(page, size, title, sortBy, order) {
    const actualOffset = page - 1;
    const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    const orders = sortBy ? [[sortBy, order]] : null;
    const { limit, offset } = this.getPagination(actualOffset, size);
    const where = {
      limit,
      offset,
      condition
    }

    const resultBook = await bookDao.getBook(where, orders);
    return this.getPagingData(resultBook, page, limit);
  }

  static getPagination(page, size) {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };

  static getPagingData (data, page, limit) {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, tutorials, totalPages, currentPage };
  };

  static async getSingleBook(id) {
    await this._syncSingleBook(id);
    return bookDao.getSingleBook(id);
  }

  static async _syncSingleBook(id) {
    try {
      const dbBook = await bookDao.findOneBook({ id_book: id });
      if (!dbBook.biblio_id) {
        return;
      }
      const response = await axios.get(`${DELTA_LIBRARY_API}/biblio/1/${DELTA_LIBRARY_SECRET}&id=${dbBook.biblio_id}`);
      const books = _.get(response, 'data.data', []);
      const promisesUpdateItems = [];
      books.forEach((book) => {
        const items = _.get(book, 'items', []);
        items.forEach((item) => {
          const where = {
            item_code: item.item_code,
            id_book: id
          };
          const itemToUpdate = {
            status: item.status
          };
          promisesUpdateItems.push(
            bookDao.updateItem(where, itemToUpdate)
          );
        })
      });
      return Promise.all(promisesUpdateItems);
    } catch (error) {
      console.log('ERROR bookService._syncSingleBook >>> ', error)
    }
  }

  static async syncBook(transaction, seq = 1, limitpage = 1){
    let currentPage = seq;
    let maxPage = limitpage;
    const gettersPromise = [];

    for(currentPage; currentPage <= maxPage; currentPage++) {
      gettersPromise.push(axios.get(`${DELTA_LIBRARY_API}/biblio/${currentPage}/${DELTA_LIBRARY_SECRET}`))
    }

    const resultPromise = await Promise.all(gettersPromise);
    let book = []
    resultPromise.forEach((response) => {
      book = [
        ...book,
        ...response.data.data
      ]
    })

    const biblio_id =  _.map(book, 'biblio_id');

    const existingBook = await bookBean.findAll({
      where: {
        biblio_id: {
          [Op.in]: biblio_id
        }
      },
      attributes: ['biblio_id'],
      raw: true,
      transaction
    })

    let filteredBook = _.filter(book, obj => !existingBook.some(item => item.biblio_id === obj.biblio_id));
    
    filteredBook = _.uniqBy(filteredBook, 'biblio_id');
    await bookBean.bulkCreate(filteredBook, {
      include: [
        {
          model: itemBean,
          as: 'items'
        },
        {
          model: authorBean,
          as: 'authors'
        }
      ],
      transaction
    });
    return { book, lastPage: maxPage };
  }
}

module.exports = BookService;
