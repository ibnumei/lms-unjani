/* eslint-disable no-restricted-syntax */
const controller = require('../../../src/controller/commonController');

jest.mock('../../../src/util/ServerTool', () => ({
  insertUpdate: jest.fn((db, data) => {
    if (data === 'fail') throw new Error('Jest Error');
  }),
  logError: jest.fn()
}));
jest.mock('../../../src/db/index', () => ({
  auditBean: {
    findOne: jest.fn().mockReturnValue({}),
    findAll: jest.fn().mockReturnValue([])
  },
  Sequelize: {}
}));

const insertUpdateSuccess = async () => {
  const req = { params: {}, body: { data: 'success' }, decodedJwt: {} };
  const res = { json: jest.fn() };
  await controller.insertUpdate(req, res);
};

const insertUpdateFail = async () => {
  const req = { params: {}, body: { data: 'fail' }, decodedJwt: {} };
  const res = { json: jest.fn() };
  await controller.insertUpdate(req, res);
};

const findOneSuccess = async () => {
  const req = { params: {}, body: { db: 'auditBean', query: {} }, decodedJwt: {} };
  const res = { json: jest.fn() };
  await controller.findOne(req, res);
};

const findOneFail = async () => {
  const req = { params: {}, body: {}, decodedJwt: {} };
  const res = { json: jest.fn() };
  await controller.findOne(req, res);
};

const findAllFail = async () => {
  const req = { params: {}, body: {}, decodedJwt: {} };
  const res = { json: jest.fn() };
  await controller.findAll(req, res);
};

const findAllSuccess = async () => {
  const req = { params: {}, body: { db: 'auditBean', query: {} }, decodedJwt: {} };
  const res = { json: jest.fn() };
  await controller.findAll(req, res);
};

describe('pagingController.test.js', () => {
  it('insertUpdate.success', insertUpdateSuccess);
  it('insertUpdate.fail', insertUpdateFail);
  it('findOne.success', findOneSuccess);
  it('findOne.fail', findOneFail);
  it('findAll.success', findAllSuccess);
  it('findAll.fail', findAllFail);
});
