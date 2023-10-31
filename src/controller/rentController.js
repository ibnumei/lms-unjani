const { rentService } = require('../service/index');
const { logError } = require('../util/ServerTool');
const { sequelize } = require('../db');


class RentController {
  static async searchRentBook(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const payload = req.body;
      const { title,itemCode } = payload
      const data = await rentService.searchRentBook(title, itemCode, transaction);
      await transaction.commit();
      res.json({ success: true, data });
    } catch (ex) {
      await transaction.rollback();
      logError('RentController.searchRentBook', ex);
      res.json({ success: false, message: 'Fail to search rent book', ex });
    }
  }

  static async rentBook(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const payload = req.body;
      const currentUser = req.decodedJwt;
      const data = await rentService.rentBook(payload, currentUser, transaction);
      await transaction.commit();
      res.json({ success: true, data });
    } catch (ex) {
      await transaction.rollback();
      logError('RentController.rentBook', ex);
      res.json({ success: false, message: 'Fail to rentBook', ex });
    }
  }
}

module.exports =RentController;
