const serverTool = require('../../../src/util/ServerTool');

jest.mock('../../../src/db/index', () => ({
  sequelize: {
    query: jest.fn((query) => {
      if (query === 'oneNull') return undefined;
      if (query === 'one0') return [];
      if (query === 'one1') return [{}];

      if (query === 'allNull') return undefined;
      if (query === 'all0') return [];
      if (query === 'all1') return [{}];

      return {};
    })
  },
  Sequelize: {
    QueryTypes: {}
  }
}));

const logError1 = async () => {
  const e = null;
  serverTool.logError('logError', e);
};

const logError2 = async () => {
  const e = { messge: 'Jest Error' };
  serverTool.logError('logError', e);
};

const logDebugReq1 = async () => {
  const at = 'ServerTool';
  const req = {
    body: {},
    params: {},
    query: {}
  };
  const e = new Error('Jest Error');
  serverTool.logDebugReq(at, req, e);
};

const logDebugReq2 = async () => {
  const at = 'ServerTool';
  const req = {
    body: {},
    params: {},
    query: {}
  };
  const e = null;
  serverTool.logDebugReq(at, req, e);
};

const logDebug1 = async () => {
  const e = null;
  serverTool.logDebug('logDebug', e);
};

const logDebug2 = async () => {
  const e = { messge: 'Jest Error' };
  serverTool.logDebug('logDebug', e);
};

const logDebug3 = async () => {
  const datas = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  const start = async () => {
    await serverTool.forEach(datas, async (data, idx) => {
      expect(datas[idx]).toMatchObject(data);
    });
  };
  start();
};

const empty1 = async () => {
  let data = null;
  let result = serverTool.empty(data);
  expect(result).toBe(true);

  data = undefined;
  result = serverTool.empty(data);
  expect(result).toBe(true);

  data = '';
  result = serverTool.empty(data);
  expect(result).toBe(true);
};

const empty2 = async () => {
  const data = 'data';
  const result = serverTool.empty(data);
  expect(result).toBe(false);
};

const printMemoryUsage = async () => {
  const message = 'Penggunaan Memory';
  serverTool.printMemoryUsage(message);
};

const encodeFileBase641 = async () => {
  const file = './test/src/file/unittest.txt';

  const encodeBase64 = serverTool.encodeFileBase64(file);
  expect(encodeBase64).not.toBeNull();
};

const encodeFileBase642 = async () => {
  const file = './test/src/file/unittest.txt';
  const base64 = '';
  serverTool.decodeFileBase64(base64, file);
};

const tomorrowStartOfDay = async () => {
  const date = serverTool.tomorrowStartOfDay();
  expect(date).not.toBeNull();
};

const cleanObject = async () => {
  const data = { name: 'atun', age: 12, sex: 'Male' };
  const result = { name: 'atun', sex: 'Male' };

  const methodReturn = serverTool.cleanObject(data, ['name', 'sex']);
  expect(methodReturn).toMatchObject(result);
};

const auditTrail1 = async () => {
  const data = {
    id: 1, name: 'atun', age: 12, sex: 'Male'
  };
  const audited = {
    id: 1, name: 'atun', age: 12, sex: 'Male', modifiedBy: 'SuperAtun'
  };

  const result = serverTool.auditTrail(data, 'id', 'SuperAtun');
  delete result.modifiedDate;
  expect(result).toMatchObject(audited);
};

const auditTrail2 = async () => {
  const data = { name: 'atun', age: 12, sex: 'Male' };
  const audited = {
    name: 'atun', age: 12, sex: 'Male', createdBy: 'SuperAtun'
  };

  const result = serverTool.auditTrail(data, 'id', 'SuperAtun');
  delete result.createdDate;
  expect(result).toMatchObject(audited);
};

const insertUpdate1 = async () => {
  const data = {
    id: 1, name: 'atun', age: 12, sex: 'Male', createdBy: 'SuperAtun'
  };
  const dao = { update() { return data; } };
  const t = {};

  const result = await serverTool.insertUpdate(dao, data, 'id', 'SuperAtun', t);
  expect(result).toMatchObject(data);
};

const insertUpdate2 = async () => {
  const data = {
    name: 'atun', age: 12, sex: 'Male', createdBy: 'SuperAtun'
  };
  const dao = { create() { return { id: 1, data }; } };
  const t = {};

  const result = await serverTool.insertUpdate(dao, data, 'id', 'SuperAtun', t);
  expect(result).toMatchObject({ id: 1, data });
};

const isEmptyObject1 = async () => {
  const data = {};
  const result = serverTool.isEmptyObject(data);
  expect(result).toBe(true);
};

const isEmptyObject2 = async () => {
  const data = { name: 'Ethan' };
  const result = serverTool.isEmptyObject(data);
  expect(result).toBe(false);
};

const encrypt = async () => {
  const data = 'P@ssw0rd';
  const result = serverTool.encrypt(data);
  expect(result).toBe('jECilMo8ry+lcnOXn5aRbw==');
};

const decrypt = async () => {
  const data = 'jECilMo8ry+lcnOXn5aRbw==';
  const result = serverTool.decrypt(data);
  expect(result).toBe('P@ssw0rd');
};

const fQueryBuilder = async () => {
  const queryBuilder = serverTool.QueryBuilder();
  expect(queryBuilder).not.toBeNull();
};

const fWhereBuilder = async () => {
  const whereBuilder = serverTool.WhereBuilder();
  expect(whereBuilder).not.toBeNull();
};

const userTokens = async () => {
  const obj = serverTool.userTokens;
  expect(obj).toMatchObject({});
};

const getFileExt1 = async () => {
  const ext = serverTool.getFileExt('elvinotan.txt');
  expect(ext).toBe('.txt');
};

const getFileExt2 = async () => {
  const ext = serverTool.getFileExt('elvinotantxt');
  expect(ext).toBe('');
};

const downloadFile = async () => {
  const res = {
    set() {},
    on() {},
    once() {},
    emit() {}
  };
  const result = {
    file: 'sdfsfsd',
    fileName: 'filename.txt'
  };
  serverTool.downloadFile(res, result);
};

const clone = async () => {
  const cloned = serverTool.clone({ id: 1 });
  expect(cloned).toMatchObject({ id: 1 });
};

const multipleUpload1 = async () => {
  const data = {
    files: null,
    label: 'FPK'
  };
  const dao = null;
  const regex = null;
  const errorMessage = 'Gagal';
  const t = null;
  const result = await serverTool.multipleUpload(data, dao, regex, errorMessage, t);
  expect(result).toMatchObject({ success: false, message: 'FPK' });
};

const multipleUpload2 = async () => {
  const data = {
    files: [],
    label: 'FPK'
  };
  const dao = null;
  const regex = null;
  const errorMessage = 'Gagal';
  const t = null;
  const result = await serverTool.multipleUpload(data, dao, regex, errorMessage, t);
  expect(result).toMatchObject({ success: true, message: null });
};

const multipleUpload3 = async () => {
  const data = {
    files: [
      { originalname: 'aku.xls' }
    ],
    label: 'FPK',
    relationId: 1
  };
  const dao = null;
  const regex = null;
  const errorMessage = 'Gagal';
  const t = null;
  const result = await serverTool.multipleUpload(data, dao, regex, errorMessage, t);
  expect(result).toMatchObject({ success: false, message: 'aku.xls gagal disimpan. Gagal' });
};

const multipleUpload4 = async () => {
  const data = {
    dataId: 1,
    files: [
      { originalname: 'aku.pdf', id: 1 },
      { originalname: 'kamu.pdf', id: null },
      { originalname: 'kalian.doc', id: null }
    ],
    label: 'FPK',
    relationId: 1
  };

  const dao = {
    fileDao: {
      insert: jest.fn((a) => {
        if (a.fileName === 'kalian.doc') {
          return { id: null };
        }
        return { id: 2 };
      })
    },
    relationDao: {
      saveDocument: jest.fn(() => {
        console.log('Func saveDocument called');
      })
    }
  };

  const errorMessage = 'Gagal';
  const t = null;
  const result = await serverTool.multipleUpload(data, dao, undefined, errorMessage, t);

  expect(result).toMatchObject({ success: false, message: 'FPK' });
};

const findOne = async () => {
  await serverTool.findOne('oneNull', {});
  await serverTool.findOne('one0', undefined);
  await serverTool.findOne('one1', {});
};

const findAll = async () => {
  await serverTool.findAll('allNull', []);
  await serverTool.findAll('all0', undefined);
  await serverTool.findAll('all1', []);
};

const encrypt2 = async () => {
  await serverTool.encrypt2('password');
};

const decrypt2 = async () => {
  const encrypted = await serverTool.encrypt2('password');
  await serverTool.decrypt2(encrypted);
};

const timeDiff = async () => {
  const newDate = new Date();
  const oldDate = new Date();
  await serverTool.timeDiff(newDate, oldDate, 30, 136);
  await serverTool.timeDiff(newDate, oldDate);
};

describe('ServerTool.test.js', () => {
  it('logError (e null or undefined)', logError1);
  it('logError (e is not null and not undefined)', logError2);
  it('logDebugReq (e is not null)', logDebugReq1);
  it('logDebugReq (e is null)', logDebugReq2);
  it('logDebug (e null or undefined)', logDebug1);
  it('logDebug (e is not null and not undefined)', logDebug2);
  it('logDebug (e is not null and not undefined)', logDebug3);
  test('empty (data empty)', empty1);
  test('empty (data not empty)', empty2);
  test('printMemoryUsage (print memory usage with message)', printMemoryUsage);
  test('encodeFileBase64 (encode file to base64)', encodeFileBase641);
  test('decodeFileBase64 (decodeFileBase64 file to base64)', encodeFileBase642);
  test('tomorrowStartOfDay (Tomorrow stard of Day)', tomorrowStartOfDay);
  test('cleanObject (Clean Object with copy mechanism)', cleanObject);
  test('auditTrail (Attach auditTrail with pk exist)', auditTrail1);
  test('auditTrail (Attach auditTrail with pk not exist)', auditTrail2);
  test('insertUpdate (Update Data)', insertUpdate1);
  test('insertUpdate (Insert Data)', insertUpdate2);
  test('isEmptyObject (Empty Object)', isEmptyObject1);
  test('isEmptyObject (Not Empty Object)', isEmptyObject2);
  test('encrypt', encrypt);
  test('decrypt', decrypt);
  test('QueryBuilder', fQueryBuilder);
  test('WhereBuilder', fWhereBuilder);
  test('userTokens', userTokens);
  test('getFileExt (dot exist)', getFileExt1);
  test('getFileExt (dot not exist)', getFileExt2);
  test('downloadFile', downloadFile);
  test('clone', clone);
  test('multipleUpload.error', multipleUpload1);
  test('multipleUpload.error', multipleUpload2);
  test('multipleUpload (File exist not match regex) ', multipleUpload3);
  test('multipleUpload (File exist match regex) ', multipleUpload4);
  test('findOne', findOne);
  test('findAll', findAll);
  test('encrypt2', encrypt2);
  test('decrypt2', decrypt2);
  test('timeDiff', timeDiff);
});
