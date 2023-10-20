const controller = require('../../../src/controller/index');
const service = require('../../../src/service/index');

describe('userController.test.js', () => {
  const req = {
  };
  const res = {
    json(jsonVal) { this.jsonVal = jsonVal; }
  };
  test('userController.test.js.getUser.error', async () => {
    req.params = {};
    req.params.userId = 1;

    service.userService.getUser = jest.fn(() => { throw new Error('Jest Error'); });
    await controller.userController.getUser(req, res);

    expect(res.jsonVal).not.toBeNull();
  });

  test('userController.test.js.getUser.success', async () => {
    req.params = {};
    req.params.userId = 1;

    service.userService.getUser = jest.fn(() => ({ userId: 1 }));
    await controller.userController.getUser(req, res);

    expect(res.jsonVal).toMatchObject({ success: true, data: { userId: 1 } });
  });
});
