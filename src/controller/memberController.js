const { memberService } = require('../service/index');
const { logError } = require('../util/ServerTool');
const { sequelize } = require('../db');

class MemberController {
  static async syncMember(req, res) {
    const transaction = await sequelize.transaction();
    try {
      await memberService.syncMember(transaction);
      await transaction.commit();
      res.json({ success: true});
    } catch (ex) {
      logError('MemberController.syncMember', ex);
      await transaction.rollback();
      res.json({ success: false, message: 'Fail to get syncMember', ex });
    }
  }
}

module.exports = MemberController;
