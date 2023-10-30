const { rentDao } = require('../dao/index');
// const { bookBean, itemBean, authorBean } = require('../db/index');
const axios = require('axios');
const { Sequelize } = require('../db');

class RentService {
  static async searchRentBook(title, itemCode, transaction) {
    let result = await rentDao.searchRentBook(title, itemCode, transaction);
    let tempAuthor = '';
    if(Object.keys(result.authors).length > 0)  {
      result.authors.forEach((author) => {
        tempAuthor = tempAuthor + `${author.author_name} `;
      })
    }
    result.dataValues.fullAuthor = tempAuthor;
    return result;
  }
}

module.exports = RentService;
