const { loginService } = require('../service/index');
const { logError } = require('../util/ServerTool');
const { sequelize } = require('../db');


class LoginController {
  static async login(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const data = await loginService.login(req.body, transaction);
      await transaction.commit();
      res.json({ success: true, data });
    } catch (ex) {
      logError('LoginController.login', ex);
      await transaction.rollback();
      res.json({ success: false, message: 'Fail to login', ex });
    }
  }

  static async logout(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const currentUser = req.decodedJwt;
      await loginService.logout(currentUser, transaction);
      await transaction.commit();
      res.json({ success: true });
    } catch (ex) {
      logError('LoginController.logout', ex);
      await transaction.rollback();
      res.json({ success: false, message: 'Fail to logout', ex });
    }
  }

  static async loginAdmin(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const data = await loginService.loginAdmin(req.body, transaction);
      await transaction.commit();
      res.json({ success: true, data });
    } catch (ex) {
      logError('LoginController.login', ex);
      await transaction.rollback();
      res.json({ success: false, message: 'Fail to login Admin', ex });
    }
  }

  static async registerAdmin(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const data = await loginService.registerAdmin(req.body, transaction);
      await transaction.commit();
      res.json({ success: true, data });
    } catch (ex) {
      logError('LoginController.registerAdmin', ex);
      await transaction.rollback();
      res.json({ success: false, message: 'Fail to register user', ex });
    }
  }

}

module.exports = LoginController;
