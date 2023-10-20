const { pagingDao } = require('../dao/index');
const { logError } = require('../util/ServerTool');

class PagingController {
  static async getPicker(req, res) {
    try {
      const data = await pagingDao.getPicker(req.query.picker);
      res.json(data);
    } catch (e) {
      logError('PagingController.getPicker', e);
      res.json(e);
    }
  }

  static async getPaging(req, res) {
    try {
      const data = await pagingDao.getPaging(req.body);
      res.json({ success: true, ...data });
    } catch (e) {
      logError('PagingController.getPaging', e);
      res.json({ success: false, message: e.message });
    }
  }

  static async getPopupOne(req, res) {
    try {
      const data = await pagingDao.getPopupOne(req.body);
      res.json({ success: true, ...data });
    } catch (e) {
      logError('PagingController.getPopupOne', e);
      res.json({ success: false, message: e.message });
    }
  }

  static async getReport(req, res) {
    try {
      const rows = await pagingDao.getReport(req.body);
      res.json({ success: true, rows });
    } catch (e) {
      logError('PagingController.getReport', e);
      res.json({ success: false, message: e.message });
    }
  }

  static async getDropdown(req, res) {
    try {
      const rows = await pagingDao.getDropdown(req.body);
      res.json({ success: true, rows });
    } catch (e) {
      logError('PagingController.getDropdown', e);
      res.json({ success: false, message: e.message });
    }
  }

  static async getDropdownData(req, res) {
    try {
      const data = await pagingDao.getDropdownData(req.body);
      res.json({ success: true, data });
    } catch (e) {
      logError('PagingController.getDropdownData', e);
      res.json({ success: false, message: e.message });
    }
  }
}

module.exports = PagingController;
