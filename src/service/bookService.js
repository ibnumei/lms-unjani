const { bookDao } = require('../dao/index');
const { bookBean, itemBean, authorBean } = require('../db/index');

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

  static async syncBook(transaction){
    let currentPage = 1
    let maxPage = 2
    const gettersPromise = []
    for(currentPage; currentPage <= maxPage; currentPage++) {
      gettersPromise.push(axios.get(`http://library-lama.unjani.id/index.php?p=api/member/${currentPage}/000SSFNNSA00124`))
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
