const bcrypt = require('bcrypt');
const { userDao } = require('../dao/index');
var jwt = require('jsonwebtoken');
const { tomorrowStartOfDay } = require('../util/ServerTool');



// Pada level Service, penambalian harus berupa real object, non promise

class LoginService {
  
  static async login(body, transaction) {
    let token = {}
    const where = {
      nama: body.nama,
      isActive: true
    }
    const user = await userDao.getUser(where)
    console.log(bcrypt.compareSync(body.password, user.password))
    if (bcrypt.compareSync(body.password, user.password)) {
        token = jwt.sign({
            id: user.id,
            nama: user.nama,
            jurusan: user.jurusan,
            email: user.email,
            noHandphone: user.noHandphone,
            statusAnggota:  user.statusAnggota,
            expireDate: Math.floor(tomorrowStartOfDay().getTime() / 1000)
        }, process.env.JWT_KEY);
        const payload = {
          id: user.id,
          nama: user.nama,
          token: token
        }
        await userDao.updateToken(payload, transaction)
        return token
    }
    throw new Error('Nama or Password is wrong');
  }
}

module.exports = LoginService;
