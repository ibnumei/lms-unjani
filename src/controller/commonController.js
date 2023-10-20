/* eslint-disable no-restricted-syntax */
const dbs = require('../db/index');
const serverTool = require('../util/ServerTool');

class CommonController {
  // {
  //     "db":"userBean",
  //     "data": {
  //         "userId": 442,
  //         "userCode": "001",
  //         "userName": "dlos01@.dev",
  //         "displayName": "elvino",
  //         "status": "DRAFT"
  //     },
  //     "pk": "userId",
  //     "desc": "Data User",
  //     "exclude": ["createdBy","createdDate", "modifiedBy", "modifiedDate"]
  // }

  // const insertUpdate = async(dao, data, pk, username, t) => {
  static async insertUpdate(req, res) {
    const {
      db, data, pk, desc, exclude
    } = req.body;
    const { username } = req.decodedJwt;
    const t = null;

    try {
      const result = await serverTool.insertUpdate(dbs[db], data, pk, username, t);
      if (exclude) {
        for (const exc of exclude) { delete result[exc]; }
      }

      res.json({ success: true, data: result });
    } catch (e) {
      serverTool.logError('Common.insertUpdate', e);
      res.json({ success: false, desc: `Gagal Simpan ${desc}` });
    }
  }

  static async findOne(req, res) {
    const { db, query, desc } = req.body;

    try {
      const result = await dbs[db].findOne({ where: query.where, attributes: query.attributes });
      const found = !!(result);
      res.json({ success: true, found, data: result });
    } catch (e) {
      serverTool.logError('Common.findOne', e);
      res.json({ success: false, desc: `Gagal Ambil Data ${desc}` });
    }
  }

  static async findAll(req, res) {
    const { db, query, desc } = req.body;

    try {
      const result = await dbs[db].findAll({ where: query.where, attributes: query.attributes });
      const found = result.length !== 0;
      res.json({ success: true, found, data: result });
    } catch (e) {
      serverTool.logError('Common.findAll', e);
      res.json({ success: false, desc: `Gagal Ambil Data ${desc}` });
    }
  }
}

module.exports = CommonController;
