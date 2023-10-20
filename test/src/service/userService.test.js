const service = require('../../../src/service/index');
const dao = require('../../../src/dao/index');

describe('userService.test.js', () => {
  test('getUser', async () => {
    dao.userDao.getUser = jest.fn(() => ({ userId: 1 }));

    const result = await service.userService.getUser(1);
    expect(result).toMatchObject({ userId: 1 });
  });
});
