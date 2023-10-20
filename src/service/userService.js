const bcrypt = require('bcrypt');
const { userDao } = require('../dao/index');


// Pada level Service, penambalian harus berupa real object, non promise

class UserService {
  /* ----------  User Management  ----------*/
  static async getUser(userId) {
    console.log('UserService.getUser', userId);
    const where = {
      id: userId
    }

    return userDao.getUser(where);
  }

  static async registerUser(body, transaction) {
    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(body.password, saltRounds);
    let payload = JSON.parse(JSON.stringify(body));
    payload.password = hashPassword
    payload.createdBy = 'SYSTEM'
    return userDao.registerUser(payload, transaction)
  }
}

module.exports = UserService;
