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
    const { fullname, username, email, phone, oldPassword, newPassword, confirmPassword } = payload
    const { type, id } = decodedJwt;

    const data = {
      id,
      fullname,
      username,
      email,
      phone
    }

    if (type !== 'ADMIN') {
      throw new Error('Unauthorized');
    }

    if (newPassword) {
      if (newPassword !== confirmPassword) {
        throw new Error('Password tidak cocok');
      }
      const where = {
        id,
        isActive: true
      }
      const user = await userDao.getUserAdmin(where)
      const validPassword = bcrypt.compareSync(oldPassword, user.password)
      if (!validPassword) {
        throw new Error('Password lama tidak sesuai');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      data.password = hashedPassword;
    }

    return userDao.updateUserAdmin(data, transaction)
  }

  static async setBebasPustaka(payload, transaction) {
    const idMembers = [];
    payload.forEach((data) => {
      idMembers.push(data.id);
    })
    console.log('test',idMembers);
    return userDao.setBebasPustaka(idMembers, transaction);
  }
}

module.exports = UserService;
