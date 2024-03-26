const { bookService, memberService } = require('../service/index');
const { syncMemberScheduler } = require('../util/scheduler')
const { logError } = require('../util/ServerTool');
const { sequelize } = require('../db');

class SyncController {

  static async syncBook(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const data = await bookService.syncBook(transaction);
      await transaction.commit();
      res.json({ data, success: true });
    } catch (ex) {
      logError('SyncController.syncBook', ex);
      await transaction.rollback();
      res.json({ success: false, message: 'Fail to get syncBook', ex });
    }
  }

  static async syncMember(req, res) {
    try {
      syncMemberScheduler();
      res.json({ success: true });
    } catch (ex) {
      logError('SyncController.syncMember', ex);
      res.json({ success: false, message: 'Fail to get syncMember', ex });
    }
  }
}

module.exports = SyncController;
