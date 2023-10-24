const { bookDao } = require('../dao/index');
const { bookBean, itemBean, authorBean } = require('../db/index');
const axios = require('axios');
const { Sequelize } = require('../db');
const { Op } = Sequelize;

class BookService {
  static async getBook(page, size, title) {
    const actualOffset = page - 1;
    const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    const { limit, offset } = this.getPagination(actualOffset, size);
    const where = {
      limit,
      offset,
      condition
    }

    const resultBook = await bookDao.getBook(where);
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
    console.log('BookService.getSingleBook', id);

    return bookDao.getSingleBook(id);
  }

  static async syncBook(transaction){
    let currentPage = 3
    let maxPage = 4
    const gettersPromise = []
    for(currentPage; currentPage <= maxPage; currentPage++) {
      gettersPromise.push(axios.get(`http://library-lama.unjani.id/index.php?p=api/biblio/${currentPage}/000SSFNNSAOO124`))
    }
      const resultPromise = await Promise.all(gettersPromise);
      let book = []
      resultPromise.forEach((response) => {
        book = [
          ...book,
          ...response.data.data
        ]
      })
    // await bulkInsertUpdate(memberBean, member, attributes, transaction)
    await bookBean.bulkCreate(book, { 
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
    return;
  }
}

module.exports = BookService;
