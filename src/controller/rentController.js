const { rentService } = require('../service/index');
const { logError } = require('../util/ServerTool');
const { sequelize } = require('../db');


class RentController {
  static async searchRentBook(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const payload = req.body;
      const { title,itemCode } = payload
      const whereBook =  { title: title };
      const whereItems = { item_code: itemCode };
      const data = await rentService.searchRentBook(whereBook, whereItems, transaction);
      await transaction.commit();
      res.json({ success: true, data });
    } catch (ex) {
      await transaction.rollback();
      logError('RentController.searchRentBook', ex);
      res.json({ success: false, message: ex.message, ex });
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
      res.json({ success: false, message: ex.message });
    }
  }

  static async returnBook(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const payload = req.body;
      const currentUser  = req.decodedJwt;
      const data = await rentService.returnBook(payload, currentUser, transaction);
      await transaction.commit();
      res.json({ success: true, data });
    } catch (ex) {
      await transaction.rollback();
      logError('RentController.returnBook', ex);
      res.json({ success: false, message: ex.message});
    }
  }

  static async searchReturnBook(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const kode_pinjam = req.params.kodePinjam;
      const data = await rentService.searchReturnBook(kode_pinjam, transaction);
      await transaction.commit();
      res.json({ success: true, data });
    } catch (ex) {
      await transaction.rollback();
      logError('RentController.searchReturnBook', ex);
      res.json({ success: false, message: ex.message});
    }
  }

  static async getListTransaction(req, res) {
    try {
      const { page, size } = req.query;
      const data = await rentService.getListTransaction(page, size);
      res.json({ success: true, data });
    } catch (ex) {
      logError('MemberController.getListTransaction', ex);
      res.json({ success: false, message: 'Fail to get getListTransaction', ex });
    }
  }

  static async getReportTransaction(req, res) {
    try {
      const { year } = req.query;
      const data = await rentService.getReportTransaction(year);
      res.json({ success: true, data });
    } catch (ex) {
      logError('MemberController.getReportTransaction', ex);
      res.json({ success: false, message: 'Fail to get getReportTransaction', ex });
    }
  }
}

module.exports =RentController;
