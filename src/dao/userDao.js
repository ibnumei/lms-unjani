const { memberBean, adminBean } = require('../db/index');
const tool = require('../util/ServerTool');

class UserDao {

  static registerUser(payload, transaction) {
    return memberBean.create(payload, {transaction});
  }

  static getUser(where) {
    return memberBean.findOne({ 
      where
    });
  }

  static updateToken(payload, transaction, type) {

    const dataToUpdate = {
      token: payload.token,
      modifiedBy: payload.modifiedBy,
      modifiedDate: new Date()
    };
    const typeTable = type === "Member" ? memberBean : adminBean;
    return typeTable.update(dataToUpdate, { where: { id: payload.id }, transaction });
  }

  static getUserAdmin(where) {
    return adminBean.findOne({
      where
    });
  }
}

module.exports = UserDao;
