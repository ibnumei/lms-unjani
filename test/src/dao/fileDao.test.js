const fileDao = require('../../../src/dao/fileDao');
const { fileBean } = require('../../../src/db/index');
const { insertUpdate } = require('../../../src/util/ServerTool');

jest.mock('../../../src/util/ServerTool', () => (
  {
    insertUpdate: jest.fn()
  }
));
jest.mock('../../../src/db/index', () => (
  {
    fileBean: {
      findOne: jest.fn()
    }
  }
));

describe('.FileDao', () => {
  describe('#saveFile', () => {
    it('should call insertUpdate function with the params', async () => {
      const data = {};
      const username = 'username';
      const transaction = jest.fn();

      await fileDao.saveFile(data, username, transaction);

      expect(insertUpdate).toHaveBeenCalledWith(fileBean, data, 'id', username, transaction);
    });
  });
  describe('#getFile', () => {
    it('should call findOne function with the params', async () => {
      const id = 1;

      await fileDao.getFile(id);

      expect(fileBean.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
