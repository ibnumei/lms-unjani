const controller = require('../../../src/controller/index');
const db = require('../../../src/db/index');

jest.mock('../../../src/util/ServerTool', () => (
  {
    findOne: jest.fn().mockReturnValue({ currDate: new Date() }),
    logError: jest.fn()
  }
));

describe('techController.test.js', () => {
  const req = {
  };
  const res = {
    json(jsonVal) { this.jsonVal = jsonVal; }
  };

  test('techController.test.js.getEnv.success', async () => {
    await controller.techController.getEnv(req, res);
  });

  test('techController.test.js.getUserDb.fail', async () => {
    db.userBean.findAll = jest.fn(() => { throw new Error('Jest Error'); });
    await controller.techController.getUserDb(req, res);

    expect(res.jsonVal).not.toBeNull();
  });

  test('techController.test.js.getUserDb.success', async () => {
    db.userBean.findAll = jest.fn(() => [{}, {}]);
    await controller.techController.getUserDb(req, res);

    expect(res.jsonVal).toMatchObject({ success: true, jumlah: 2 });
  });

  test('techController.test.js.getTime', async () => {
    await controller.techController.getTime(req, res);
    expect(res.jsonVal).not.toBeNull();
  });
});
