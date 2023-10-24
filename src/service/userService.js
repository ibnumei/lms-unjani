const bcrypt = require('bcrypt');
const { userDao } = require('../dao/index');

class UserService {
  static async getUser(id) {
    const where = {
      id
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
