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
    // return userBean.update({ token: payload.token }, {
    //   where: {
    //     id: payload.id,
    //   },
    // });

    const dataToUpdate = {
      token: payload.token,
      modifiedBy: payload.nama,
      modifiedDate: new Date()
    };
    return memberBean.update(dataToUpdate, { where: { id: payload.id }, transaction });
  }
}

module.exports = UserDao;
