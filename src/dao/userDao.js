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

    // const dataToUpdate = {
    //   token: payload.token,
    //   modifiedBy: payload.modifiedBy,
    //   modifiedDate: new Date()
    // };
    const typeTable = type === "Member" ? memberBean : adminBean;
    return typeTable.update(payload, { where: { id: payload.id }, transaction });
  }

  static getUserAdmin(where) {
    return adminBean.findOne({
      where
    });
  }

  static insertUserAdmin(payload) {
    return adminBean.create({
      ...payload,
      createdDate: new Date(),
    });
  }

  static updateUserAdmin(payload, transaction) {
    return adminBean.update(payload, {
      where: {
        id: payload.id
      },
      transaction
    });
  }
}

module.exports = UserDao;
