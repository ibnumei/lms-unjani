const { userBean } = require('../db/index');
const { logError, findOne } = require('../util/ServerTool');

class TechController {
  static async getEnv(req, res) {
    const env = process.env.ENVIROMENT;
    res.json({ success: true, env });
  }

  static async getUserDb(req, res) {
    try {
      const users = await userBean.findAll();
      res.json({ success: true, jumlah: users.length });
    } catch (ex) {
      logError('TechController.getUserDb', ex);
      res.json({ success: false, message: 'Fail to get user', ex });
    }
  }

  static async getTime(req, res) {
    const msCurrentDate = new Date();
    const msCurrentDateStr = `${msCurrentDate.getFullYear()}-${(msCurrentDate.getMonth() + 1)}-${msCurrentDate.getDate()} ${msCurrentDate.getHours()}:${msCurrentDate.getMinutes()}:${msCurrentDate.getSeconds()}`;

    let dbCurrentDate = await findOne('select now() as currDate from dual');
    dbCurrentDate = dbCurrentDate.currDate;
    const dbCurrentDateStr = `${dbCurrentDate.getFullYear()}-${(dbCurrentDate.getMonth() + 1)}-${dbCurrentDate.getDate()} ${dbCurrentDate.getHours()}:${dbCurrentDate.getMinutes()}:${dbCurrentDate.getSeconds()}`;

    const msCurrentDateAdd = new Date();
    msCurrentDateAdd.setHours(msCurrentDateAdd.getHours() + 7);
    const msCurrentDateAddStr = `${msCurrentDateAdd.getFullYear()}-${(msCurrentDateAdd.getMonth() + 1)}-${msCurrentDateAdd.getDate()} ${msCurrentDateAdd.getHours()}:${msCurrentDateAdd.getMinutes()}:${msCurrentDateAdd.getSeconds()}`;

    res.json({
      success: true, msCurrentDate, msCurrentDateStr, dbCurrentDate, dbCurrentDateStr, msCurrentDateAdd, msCurrentDateAddStr
    });
  }
}

module.exports = TechController;
