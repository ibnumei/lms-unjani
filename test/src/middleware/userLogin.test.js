const jwt = require('jsonwebtoken');
const userLogin = require('../../../src/middleware/userLogin');
const dao = require('../../../src/dao/index');

describe('userLogin.test.js', () => {
  test('fUserLogin (!req.headers.token)', () => {
    const req = {
      headers: {}
    };
    const res = {};
    const next = {};
    userLogin.fUserLogin(req, res, next);
  });

  test('fUserLogin (req.headers.token = k3mb4nggul4)', () => {
    const req = {
      headers: { token: 'k3mb4nggul4' }
    };
    const res = {};
    const next = {};
    userLogin.fUserLogin(req, res, next);
  });

  test('fUserLogin (req.headers.token = k3mb4nggul42)', () => {
    const req = {
      headers: { token: 'k3mb4nggul42' }
    };
    const res = {};
    const next = {};
    userLogin.fUserLogin(req, res, next);
  });

  test('fUserLogin (req.headers.token = real expired)', () => {
    const req = {
      headers: { token: 'realtoken' }
    };

    jwt.verify = jest.fn(() => ({ id: 1, expireDate: 0 }));

    const res = {};
    const next = {};
    userLogin.fUserLogin(req, res, next);
  });

  test('fUserLogin (req.headers.token = real not expired token equal)', () => {
    const req = {
      headers: { token: 'realtoken' }
    };

    jwt.verify = jest.fn(() => ({ id: 1, expireDate: 991582342552 }));

    dao.userDao.getUser = jest.fn(() => ({ token: 'realtoken' }));

    const res = {};
    const next = {};
    userLogin.fUserLogin(req, res, next);
  });

  test('fUserLogin (req.headers.token = real not expired token not equal)', () => {
    const req = {
      headers: { token: 'realtoken' }
    };

    jwt.verify = jest.fn(() => ({ id: 1, expireDate: 991582342552 }));

    dao.userDao.getUser = jest.fn(() => ({ token: 'faketoken' }));

    const res = {};
    const next = {};
    userLogin.fUserLogin(req, res, next);
  });
});
