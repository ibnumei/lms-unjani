const { auditDao } = require('../../../src/dao/index');
const { auditBean } = require('../../../src/db/index');

jest.mock('../../../src/db/index');

describe('#save', () => {
  it('should create audit data', async () => {
    const entityKey = 5;
    const entityName = 'RAC';
    const type = 'T';
    const desc = 'Dummy desc';
    const json = 'Dummy Json';
    const username = 'Username';

    const t = {
      commit: jest.fn(),
      rollback: jest.fn()
    };

    const expectedResult = [{
      entityKey: 5,
      entityName: 'RAC',
      type: 'T',
      desc: 'Dummy desc',
      json: 'Dummy Json',
      username: 'Username'
    }];

    auditBean.create = jest.fn().mockResolvedValue(expectedResult);
    const actualResult = await auditDao.audit(entityKey, entityName, type, desc, json, username, t);

    expect(actualResult).toEqual(expectedResult);
  });

  it('should create audit data with auditText', async () => {
    const entityKey = 5;
    const entityName = 'RAC';
    const desc = 'Dummy desc';
    const username = 'Username';

    const t = {
      commit: jest.fn(),
      rollback: jest.fn()
    };

    const expectedResult = [{
      entityKey: 5,
      entityName: 'RAC',
      type: 'T',
      desc: 'Dummy desc',
      json: 'Dummy Json',
      username: 'Username'
    }];

    auditDao.auditDao = jest.fn().mockResolvedValue(expectedResult);
    const actualResult = await auditDao.auditText(entityKey, entityName, desc, username, t);

    expect(actualResult).toEqual(expectedResult);
  });

  it('should create audit data with auditJson', async () => {
    const entityKey = 5;
    const entityName = 'RAC';
    const desc = 'Dummy desc';
    const username = 'Username';
    const json = 'Dummy Json';

    const t = {
      commit: jest.fn(),
      rollback: jest.fn()
    };

    const expectedResult = [{
      entityKey: 5,
      entityName: 'RAC',
      type: 'T',
      desc: 'Dummy desc',
      json: 'Dummy Json',
      username: 'Username'
    }];

    auditDao.auditDao = jest.fn().mockResolvedValue(expectedResult);
    const actualResult = await auditDao.auditJson(entityKey, entityName, desc, json, username, t);

    expect(actualResult).toEqual(expectedResult);
  });

  it('should create audit data with auditReqRes', async () => {
    const eKey = 5;
    const eName = 'RAC';
    const desc = 'Dummy desc';
    const username = 'Username';
    const req = 'Dummy request';
    const res = 'Dummy response';

    const t = {
      commit: jest.fn(),
      rollback: jest.fn()
    };

    const expectedResult = [{
      entityKey: 5,
      entityName: 'RAC',
      type: 'T',
      desc: 'Dummy desc',
      json: 'Dummy Json',
      username: 'Username'
    }];

    auditDao.auditDao = jest.fn().mockResolvedValue(expectedResult);
    const actualResult = await auditDao.auditReqRes(eKey, eName, desc, req, res, username, t);

    expect(actualResult).toEqual(expectedResult);
  });

  it('should create audit data with auditBefAft', async () => {
    const eKey = 5;
    const eName = 'RAC';
    const desc = 'Dummy desc';
    const username = 'Username';
    const before = 'Dummy before';
    const after = 'Dummy after';

    const t = {
      commit: jest.fn(),
      rollback: jest.fn()
    };

    const expectedResult = [{
      entityKey: 5,
      entityName: 'RAC',
      type: 'T',
      desc: 'Dummy desc',
      json: 'Dummy Json',
      username: 'Username'
    }];

    auditDao.auditDao = jest.fn().mockResolvedValue(expectedResult);
    const actualResult = await auditDao.auditBefAft(eKey, eName, desc, before, after, username, t);

    expect(actualResult).toEqual(expectedResult);
  });
});
