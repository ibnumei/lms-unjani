const bcrypt = require('bcrypt');
const axios = require('axios');
const {bulkInsertUpdate} = require('../util/ServerTool');
const { memberBean } = require('../db/index');
const { userDao } = require('../dao/index');



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

  static async syncMember(transaction){
    let currentPage = 1001
    let maxPage = 1100
    const gettersPromise = []
    for(currentPage; currentPage <= maxPage; currentPage++) {
      gettersPromise.push(axios.get(`http://library-lama.unjani.id/index.php?p=api/member/${currentPage}/000SSFNNSA00124`))
    }
        const resultPromise = await Promise.all(gettersPromise);
        let member = []
        resultPromise.forEach((response) => {
          member = [
            ...member,
            ...response.data.data
          ]
        })
        const attributes = ['id', 'member_id', 'member_name', 'gender', 'member_type_name', 'member_mail_address', 'member_email', 'member_image', 'pin', 'member_since_date', 'register_date', 'expire_date', 'member_notes', 'input_date', 'last_update','isActive','createdBy', 'createdDate'];
        await bulkInsertUpdate(memberBean, member, attributes, transaction)
        return;
  }

  static async getMember(page, size) {
    const actualOffset = page - 1;
    const { limit, offset } = this.getPagination(actualOffset, size);
    const where = {
      limit,
      offset,
    }
    const attributes = ['id', 'member_id', 'member_name', 'gender', 'member_type_name', 'member_mail_address', 'member_email', 'member_since_date',  'register_date', 'expire_date', 'member_notes', 'input_date', 'last_update', 'tgl_join']
    const resultMember = await userDao.getMemberPagination(where, attributes);
    return this.getPagingData(resultMember, page, limit);
  }

  static getPagination(page, size) {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };

  static getPagingData (data, page, limit) {
    const { count: totalItems, rows: members } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, members, totalPages, currentPage };
  };
}

module.exports = MemberService;
