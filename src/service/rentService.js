const { rentDao } = require('../dao/index');
// const { bookBean, itemBean, authorBean } = require('../db/index');
const axios = require('axios');
const { Sequelize } = require('../db');

class RentService {
  static async searchRentBook(title, itemCode, transaction) {
    return rentDao.searchRentBook(title, itemCode, transaction);
  }
}

module.exports = RentService;
