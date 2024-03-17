const _ = require('lodash');
const bcrypt = require('bcrypt');
const { userDao } = require('../dao/index');
var jwt = require('jsonwebtoken');
const { tomorrowStartOfDay } = require('../util/ServerTool');
const { Op } = require('sequelize');


// Pada level Service, penambalian harus berupa real object, non promise

class LoginService {
  
  static async login(body, transaction) {
    let token = {}
    const where = {
      member_name: body.nama,
      isActive: true,
      expire_date: { [Op.notLike]: `0000-%` }
    }
    const user = await userDao.getUser(where)
    const type = "Member";
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
            type,
            expireDateToken: '5m'
        }, process.env.JWT_KEY,
        {
          expiresIn: '5m'
        });
        const payload = {
          id: user.id,
          token: token,
          modifiedBy: user.member_name,
          modifiedDate: new Date()
        }
        if (!!body.firstLogin) {
          payload.hasLoggedIn = true
          payload.tgl_join = new Date()
          payload.password = this.hashNewPassword(body)
        }
        await userDao.updateToken(payload, transaction, type)
        return token
    }
    throw new Error('Nama or Password is wrong');
  }

  static async logout(currentUser, transaction) {
    const { type } = currentUser
    const payload = {
      id: currentUser.id,
      token: null,
      modifiedBy: currentUser.member_name
    }
    return userDao.updateToken(payload, transaction, type)
  }

  static async loginAdmin(body, transaction) {
    let token = {}
    const where = {
      username: body.username,
      isActive: true
    }
    const user = await userDao.getUserAdmin(where)
    const type = "ADMIN"
    if (bcrypt.compareSync(body.password, user.password)) {
        token = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            fullname: user.fullname,
            phone: user.phone,
            type,
            expireDateToken: Math.floor(tomorrowStartOfDay().getTime() / 1000)
        }, process.env.JWT_KEY);
        const payload = {
          id: user.id,
          token: token,
          modifiedBy: user.name
        }
        await userDao.updateToken(payload, transaction, type)
        return token
    }
    throw new Error('Nama or Password is wrong');
  }

  static async checkLogin(body){
    const where = {
      member_name: body.nama,
      isActive: true
    }
    return userDao.getUser(where)
  }

  static hashNewPassword(body){
    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(body.newPassword, saltRounds);
    return hashPassword;
  }
  
  static async registerAdmin(payload) {
    const existingUser = await userDao.getUserAdmin({ 
      username: payload.username
    });
    if (existingUser) {
      throw new Error('Username already taken');
    }
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = await userDao.insertUserAdmin({
      ...payload,
      password: hashedPassword,
      isActive: false
    });
    return _.pick(user, ['id']);
  }
}

module.exports = LoginService;
