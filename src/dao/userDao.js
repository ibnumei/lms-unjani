const { userBean } = require('../db/index');
const tool = require('../util/ServerTool');

class UserDao {

  static registerUser(payload, transaction) {
    return userBean.create(payload, {transaction});
  }

  static getUser(where) {
    return userBean.findOne({ 
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
    return userBean.update(dataToUpdate, { where: { id: payload.id }, transaction });
  }
}

module.exports = UserDao;
