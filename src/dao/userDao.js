const { memberBean } = require('../db/index');
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

  static updateToken(payload, transaction) {

    const dataToUpdate = {
      token: payload.token,
      modifiedBy: payload.modifiedBy,
      modifiedDate: new Date()
    };
    return memberBean.update(dataToUpdate, { where: { id: payload.id }, transaction });
  }
}

module.exports = UserDao;
