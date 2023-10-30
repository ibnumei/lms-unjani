const { bookBean, itemBean, authorBean } = require('../db/index');
const tool = require('../util/ServerTool');

class RentDao {
  static searchRentBook(title, itemCode, transaction) {
    return bookBean.findOne({ 
      where: { title } ,
      rew: true,
      include: [
        {
            model: authorBean,
            as: 'authors'
        },
        {
          model: itemBean,
          as: 'items',
          where: { item_code: itemCode}
        }
      ],
      transaction
    });
  }
}

module.exports = RentDao;
