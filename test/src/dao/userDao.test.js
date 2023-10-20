const userDao = require('../../../src/dao/userDao');
const { userBean } = require('../../../src/db/index');
const tool = require('../../../src/util/ServerTool');
const Where = require('../../../src/util/Where');
const Query = require('../../../src/util/Query');

jest.mock('../../../src/util/ServerTool', () => ({
  WhereBuilder: jest.fn(),
  QueryBuilder: jest.fn()
}));
jest.mock('../../../src/util/Where', () => ({
  eq: jest.fn()
}));
jest.mock('../../../src/util/Query', () => ({
  addTarget: jest.fn(),
  addWhere: jest.fn(),
  findOne: jest.fn()
}));

describe('.UserDao', () => {
  describe('#getUser', () => {
    it('should call the functions ', async () => {
      const userId = 1;
      const whereQuery = 'where query';
      Where.eq.mockReturnValue(whereQuery);
      tool.WhereBuilder.mockImplementation(() => Where);
      Query.addTarget.mockReturnValue(Query);
      Query.addWhere.mockReturnValue(Query);
      tool.QueryBuilder.mockImplementation(() => Query);

      await userDao.getUser(userId);

      expect(Where.eq).toHaveBeenCalledWith('userId', userId);
      expect(Query.addTarget).toHaveBeenCalledWith(userBean);
      expect(Query.addWhere).toHaveBeenCalledWith(whereQuery);
      expect(Query.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
