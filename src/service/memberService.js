const bcrypt = require('bcrypt');
const axios = require('axios');
const {bulkInsertUpdate} = require('../util/ServerTool');
const { memberBean } = require('../db/index');
const { sequelize } = require('../db');



// Pada level Service, penambalian harus berupa real object, non promise

class UserService {
  // static async getUser(userId) {
  //   console.log('UserService.getUser', userId);
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

  static async syncMember(){
    // const currentPage = 1
    // const maxPage = 10
    // for(currentPage; currentPage <= maxPage; currentPage++) {
    //     const result = await axios.get('http://library-lama.unjani.id/index.php?p=api/member/1/000SSFNNSA00124')
    //     const dataMember  =  result.data.data
    //     const attributes = ['id', 'member_id', 'member_name', 'gender', 'member_type_name', 'member_mail_address', 'member_email', 'member_image', 'pin', 'member_since_date', 'register_date', 'expire_date', 'member_notes', 'input_date', 'last_update','isActive','createdBy', 'createdDate'];
    //     dataMember.map(singleData =>  {
    //       singleData.isActive = true
    //       singleData.createdBy = "SYSTEM";
    //       singleData.createdDate = new Date();
    //       return singleData
    //     })
    //     await bulkInsertUpdate(memberBean, dataMember, attributes, transaction)
    // }
    const transaction = await sequelize.transaction();
    try {
      const result = await axios.get('http://library-lama.unjani.id/index.php?p=api/member/1/000SSFNNSA00124');
      const dataMember  =  result.data.data;
      const attributes = ['id', 'member_id', 'member_name', 'gender', 'member_type_name', 'member_mail_address', 'member_email', 'member_image', 'pin', 'member_since_date', 'register_date', 'expire_date', 'member_notes', 'input_date', 'last_update','isActive','createdBy', 'createdDate'];
      dataMember.map(singleData =>  {
        singleData.isActive = true;
        singleData.createdBy = "SYSTEM";
        singleData.createdDate = new Date();
        return singleData;
      })
      await bulkInsertUpdate(memberBean, dataMember, attributes, transaction);
      await transaction.commit();
    } catch(e) {
      await transaction.rollback();
      throw new Error('Failed Sync Data', e);
    }
        
  }
}

module.exports = UserService;
