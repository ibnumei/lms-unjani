const _ = require('lodash');
const { userService } = require('../service/index');
const { logError } = require('../util/ServerTool');
const { sequelize } = require('../db');

class UserController {
  static async getUser(req, res) {
    try {
      const data = await userService.getUser(req.params.id);
      res.json({ success: true, data });
    } catch (ex) {
      logError('UserController.getUser', ex);
      res.json({ success: false, message: 'Fail to get user', ex });
    }
  }

  static async registerUser(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const body = req.body;
      const data = await userService.registerUser(body, transaction);
      await transaction.commit();
      res.json({ success: true, data });
    } catch (ex) {
      await transaction.rollback();
      logError('UserController.registerUser', ex);
      res.json({ success: false, message: 'Fail to create user', ex });
    }
  }

  static async updateUserAdmin(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const body = req.body;
      const decodedJwt = req.decodedJwt
      const data = await userService.updateUserAdmin(body, decodedJwt, transaction);
      await transaction.commit();
      res.json({ success: true, data });
    } catch (ex) {
      await transaction.rollback();
      logError('UserController.registerUser', ex);
      res.status(400).json({
        success: false,
        message: _.get(ex, 'message', 'Failed to update data'),
        ex
      });
    }
  }

  static async setBebasPustaka(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const payload = req.body;
      console.log('payload',payload)
      const data = await userService.setBebasPustaka(payload, transaction);
      await transaction.commit();
      res.json({ success: true, data });
    } catch (e) {
      await transaction.rollback();
      res.json({ success: false, message: 'Fail to set bebas pustaka user', e });
    }
  }
}

module.exports = UserController;
