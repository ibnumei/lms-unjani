const bcrypt = require('bcrypt');
const axios = require('axios');
const { memberBean } = require('../db/index');
const { userDao } = require('../dao/index');

const defaultPassword = process.env.DEFAULT_PASSWORD;
const HASHED_PASSWORD = bcrypt.hashSync(defaultPassword, 10);

// Pada level Service, penambalian harus berupa real object, non promise

class MemberService {
  // static async getUser(userId) {
  //   console.log('MemberService.getUser', userId);
  //   const where = {
  //     id: userId
  //   }

  //   return userDao.getUser(where);
  // }

  // static async registerUser(body, transaction) {
  //   const saltRounds = 10;
  //   const hashPassword = bcrypt.hashSync(body.password, saltRounds);
  //   let payload = JSON.parse(JSON.stringify(body));
  //   payload.password = hashPassword
  //   payload.createdBy = 'SYSTEM'
  //   return userDao.registerUser(payload, transaction)
  // }

  static async syncMember(transaction, seq = 1, limitpage = 1) {
    let currentPage = seq;
    let maxPage = limitpage;
    const gettersPromise = [];

    const DELTA_LIBRARY_API = process.env.DELTA_LIBRARY_API;
    const DELTA_LIBRARY_SECRET = process.env.DELTA_LIBRARY_SECRET

    for (currentPage; currentPage <= maxPage; currentPage++) {
      gettersPromise.push(axios.get(`${DELTA_LIBRARY_API}/member/${currentPage}/${DELTA_LIBRARY_SECRET}`))
    }

    const resultPromise = await Promise.all(gettersPromise);
    let bulkMember = []
    const promiseMembers = []
    let memberKeys = []
    for (const response of resultPromise) {
      for (const responseData of response.data.data) {
        const existingData = await userDao.getUser({ member_id: responseData.member_id })
        const isNew = !existingData
        const isNotUpdate = !!existingData && new Date(existingData.last_update) < new Date(responseData.last_update)
        if (isNew) {
          responseData.password = HASHED_PASSWORD
        }
        if (isNew || isNotUpdate) {
          bulkMember.push(responseData)
        }
        if (!memberKeys.length) {
          memberKeys = Object.keys(responseData).filter(key => key !== 'password')
        }
      }

      promiseMembers.push(memberBean.bulkCreate(bulkMember, { updateOnDuplicate: memberKeys, transaction }))
    }

    return Promise.all(promiseMembers);
  }

  static async getMember(page, size) {
    const actualOffset = page - 1;
    const { limit, offset } = this.getPagination(actualOffset, size);
    const where = {
      limit,
      offset,
    }
    const attributes = ['id', 'member_id', 'member_name', 'gender', 'member_type_name', 'member_mail_address', 'member_email', 'member_since_date', 'register_date', 'expire_date', 'member_notes', 'input_date', 'last_update', 'tgl_join']
    const resultMember = await userDao.getMemberPagination(where, attributes);
    return this.getPagingData(resultMember, page, limit);
  }

  static getPagination(page, size) {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  };

  static getPagingData(data, page, limit) {
    const { count: totalItems, rows: members } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, members, totalPages, currentPage };
  };
}

module.exports = MemberService;
