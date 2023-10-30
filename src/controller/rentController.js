const { rentService } = require('../service/index');
const { logError } = require('../util/ServerTool');
const { sequelize } = require('../db');


class RentController {
  static async searchRentBook(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { title, itemCode } = req.query;
      const data = await rentService.searchRentBook(title, itemCode, transaction);
      await transaction.commit();
      res.json({ success: true, data });
    } catch (ex) {
      await transaction.rollback();
      logError('RentController.searchRentBook', ex);
      res.json({ success: false, message: 'Fail to search rent book', ex });
    }
  }
}

module.exports =RentController;
