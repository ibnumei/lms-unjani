const _ = require('lodash');
const { bookDao } = require('../dao/index');
const { bookBean, itemBean, authorBean } = require('../db/index');
const axios = require('axios');
const { Sequelize } = require('../db');
const { Op } = Sequelize;

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
    return bookDao.getSingleBook(id);
  }

  static async syncBook(transaction, seq = 1, limitpage = 1){
    let currentPage = seq;
    let maxPage = limitpage;
    const gettersPromise = [];

    const DELTA_LIBRARY_API = process.env.DELTA_LIBRARY_API;
    const DELTA_LIBRARY_SECRET =  process.env.DELTA_LIBRARY_SECRET

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
