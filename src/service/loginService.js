const bcrypt = require('bcrypt');
const { userDao } = require('../dao/index');
var jwt = require('jsonwebtoken');
const { tomorrowStartOfDay } = require('../util/ServerTool');



// Pada level Service, penambalian harus berupa real object, non promise

class LoginService {
  
  static async login(body, transaction) {
    let token = {}
    const where = {
      member_name: body.nama,
      isActive: true
    }
    const user = await userDao.getUser(where)
    if (bcrypt.compareSync(body.password, user.password)) {
        token = jwt.sign({
            id: user.id,
            member_id: user.member_id,
            member_name: user.member_name,
            gender: user.gender,
            member_type_name: user.member_type_name,
            member_mail_address: user.member_mail_address,
            member_email: user.member_email,
            member_image: user.member_image,
            pin: user.pin,
            member_since_date: user.member_since_date,
            expireDateToken: Math.floor(tomorrowStartOfDay().getTime() / 1000)
        }, process.env.JWT_KEY);
        const payload = {
          id: user.id,
          token: token,
          modifiedBy: user.member_name
        }
        await userDao.updateToken(payload, transaction)
        return token
    }
    throw new Error('Nama or Password is wrong');
  }

  static async logout(currentUser, transaction) {
    const payload = {
      id: currentUser.id,
      token: null,
      modifiedBy: currentUser.member_name
    }
    return userDao.updateToken(payload, transaction)
  }
}

module.exports = LoginService;
