const { memberBean, adminBean } = require('../db/index');
const tool = require('../util/ServerTool');
const { Op } = require('sequelize');

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

  static getMemberPagination(where, attributes) {
    return memberBean.findAndCountAll({
      limit: where.limit,
      offset: where.offset,
      attributes
    });
  }

  static setBebasPustaka(idMembers, transaction) {
    return memberBean.update({
      bebas_pustaka: true
    },{
      where: {
        id: {
          [Op.in]: idMembers
        }
      },
      transaction
    });
  }
}

module.exports = UserDao;
