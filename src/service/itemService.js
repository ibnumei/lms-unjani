const axios = require('axios');
const { itemBean } = require('../db');

class ItemService {
  static async syncItem(transaction, seq = 1, limitpage = 1) {
    let currentPage = seq;
    let maxPage = limitpage;
    const gettersPromise = [];

    const DELTA_LIBRARY_API = process.env.DELTA_LIBRARY_API;
    const DELTA_LIBRARY_SECRET = process.env.DELTA_LIBRARY_SECRET

    for (currentPage; currentPage <= maxPage; currentPage++) {
      gettersPromise.push(axios.get(`${DELTA_LIBRARY_API}/biblio/${currentPage}/${DELTA_LIBRARY_SECRET}`))
    }

    const resultPromise = await Promise.all(gettersPromise);
    let bulkItems = []
    const promiseItems = []
    resultPromise.forEach((response) => {
      response.data.data.forEach(responseData => {
        if (responseData.items) {
          bulkItems = bulkItems.concat(responseData.items)
        }
      })

      promiseItems.push(itemBean.bulkCreate(bulkItems, { updateOnDuplicate: ['status'], transaction }))
    })

    return Promise.all(promiseItems);
  }
}

module.exports = ItemService;
