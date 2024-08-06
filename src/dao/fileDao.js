const { fileBean } = require('../db/index');
const { insertUpdate } = require('../util/ServerTool');

class FileDao {
  static saveFile(data, username, t) {
    return insertUpdate(fileBean, data, 'id', username, t);
  }

  static getFile(id) {
    return fileBean.findOne({ where: { id } });
  }

  static getBanner() {
    return fileBean.findAll();
  }
}

module.exports = FileDao;
