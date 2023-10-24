const bcrypt = require('bcrypt');
const axios = require('axios');
const {bulkInsertUpdate} = require('../util/ServerTool');
const { memberBean } = require('../db/index');



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
}

module.exports = MemberService;
