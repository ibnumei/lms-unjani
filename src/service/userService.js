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

  static async updateUserAdmin(payload, decodedJwt, transaction) {
    const { fullname, username, email, phone } = payload
    const { type, id } = decodedJwt;
    if (type !== 'ADMIN') {
      throw new Error('Unauthorized');
    }
    const data = {
      id,
      fullname,
      username,
      email,
      phone
    }
    return userDao.updateUserAdmin(data, transaction)
  }
}

module.exports = UserService;
