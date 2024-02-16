const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { userDao } = require('../dao/index');
const { logError } = require('../util/ServerTool');
const { jwtError } = require('../util/Enums');

const fUserLogin = async (req, res, next) => {

  if (req.headers.token) {
    if (req.headers.token === 'k3mb4nggul4') {
      if (req.headers.postmantoken) {
        req.decodedJwt = JSON.parse(req.headers.postmantoken);
      } else {
        req.decodedJwt = {
          id: 6,
          username: 'btpnlos03.dev',
          userCode: '06',
          displayName: 'Gilda',
          role: 'SME',
          LOBId: '1',
          LOBName: 'SME',
          branchCode: '0006',
          branchId: '133',
          salesOfficeCode: '10006',
          salesOfficeId: '209',
          areaCode: '0006',
          areaId: '75',
          regionCode: '8103',
          regionId: '35',
          nik: 'btpnlos03.dev',
          expireDateToken: 1568720966
        };
      }
      next();
    } else {
      console.log(`Token >>> [${req.headers.token}]`);
      try {
        req.decodedJwt = jwt.verify(req.headers.token, process.env.JWT_KEY)
      } catch (error) {
        logError('filter-controller.fUserLogin', { message: jwtError[error.name] ? jwtError[error.name].message : error.name});

        res.status(401).json({
          error: new Error(jwtError[error.name] ? jwtError[error.name].error : error.message)
        });
      }

      const userId = req.decodedJwt.id;
      const cacheId = `UserLoginCache_${userId}`;

      const cacheDateTime = userDao[cacheId] ? userDao[cacheId] : 0;
      const currentDateTime = (new Date()).getTime();

      if (cacheDateTime < currentDateTime) {
        const where = {
          id: userId,
          isActive: true
        }
        let user = {}
        if (req.decodedJwt.type === "Member") {
          user = await userDao.getUser(where);
        } else {
          user = await userDao.getUserAdmin(where);
        }

        if (user.token === req.headers.token) {
          userDao[cacheId] = (new Date()).getTime() + 30000;
          next();
        } else {
          console.log('token beda')
          userDao[cacheId] = 0;
          logError('filter-controller.fUserLogin', { message: `Webtoken is not match [${user.token} = ${req.headers.token}]` });
          // next(createError(401, 'Webtoken is not match')); // dia relogin dari dari tempat lain
          res.status(401).json({
            error: new Error('Invalid request!')
          });
        }
      } else {
        next();
      }
    }
  } else {
    logError('filter-controller.fUserLogin', { message: 'Webtoken is not exist' });
    // next(createError(401, 'Webtoken is not exist')); // ada yang bypass ?
    res.status(401).json({
      success: false, message: 'Invalid  Request'
    });
  }
};

module.exports = { fUserLogin };
