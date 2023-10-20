const controller = require('../../../src/controller/index');
const dao = require('../../../src/dao/index');

describe('pagingController.test.js', () => {
  const req = {
  };
  const res = {
    json(jsonVal) { this.jsonVal = jsonVal; }
  };
  it('getPicker.error', async () => {
    req.query = {
      picker: 'pagingUnitTest'
    };

    dao.pagingDao.getPicker = jest.fn(() => { throw new Error('Jest Error'); });
    await controller.pagingController.getPicker(req, res);

    expect(res.jsonVal).not.toBeNull();
  });

  it('getPicker.success', async () => {
    req.query = {
      picker: 'pagingUnitTest'
    };

    const resultDb = { picker: true };
    dao.pagingDao.getPicker = jest.fn(() => resultDb);
    await controller.pagingController.getPicker(req, res);

    expect(res.jsonVal).toMatchObject(resultDb);
  });

  it('getPaging.error', async () => {
    req.query = {
      picker: 'pagingUnitTest'
    };

    dao.pagingDao.getPaging = jest.fn(() => { throw new Error('Jest Error'); });
    await controller.pagingController.getPaging(req, res);

    expect(res.jsonVal).toMatchObject({ success: false, message: 'Jest Error' });
  });

  it('getPaging.success', async () => {
    req.query = {
      picker: 'pagingUnitTest'
    };

    const resultDb = { picker: true };
    dao.pagingDao.getPaging = jest.fn(() => resultDb);
    await controller.pagingController.getPaging(req, res);

    expect(res.jsonVal).toMatchObject({ success: true, ...resultDb });
  });

  it('getPopupOne.error', async () => {
    req.query = {
      picker: 'popupUnitTest'
    };

    dao.pagingDao.getPopupOne = jest.fn(() => { throw new Error('Jest Error'); });
    await controller.pagingController.getPopupOne(req, res);

    expect(res.jsonVal).toMatchObject({ success: false, message: 'Jest Error' });
  });

  it('getPopupOne.success', async () => {
    req.query = {
      picker: 'popupUnitTest'
    };

    const resultDb = { picker: true };
    dao.pagingDao.getPopupOne = jest.fn(() => resultDb);
    await controller.pagingController.getPopupOne(req, res);

    expect(res.jsonVal).toMatchObject({ success: true, ...resultDb });
  });

  it('getReport.error', async () => {
    req.query = {
      picker: 'pagingUnitTest'
    };

    dao.pagingDao.getReport = jest.fn(() => { throw new Error('Jest Error'); });
    await controller.pagingController.getReport(req, res);

    expect(res.jsonVal).toMatchObject({ success: false, message: 'Jest Error' });
  });

  it('getReport.success', async () => {
    req.query = {
      picker: 'popupUnitTest'
    };

    const resultDb = [{ picker: true }];
    dao.pagingDao.getReport = jest.fn(() => resultDb);
    await controller.pagingController.getReport(req, res);

    expect(res.jsonVal).toMatchObject({ success: true, rows: resultDb });
  });

  it('getDropdown.error', async () => {
    req.query = {
      picker: 'popupUnitTest'
    };

    dao.pagingDao.getDropdown = jest.fn(() => { throw new Error('Jest Error'); });
    await controller.pagingController.getDropdown(req, res);

    expect(res.jsonVal).toMatchObject({ success: false, message: 'Jest Error' });
  });

  it('getDropdown.success', async () => {
    req.query = {
      picker: 'popupUnitTest'
    };

    const resultDb = { picker: true };
    dao.pagingDao.getDropdown = jest.fn(() => resultDb);
    await controller.pagingController.getDropdown(req, res);

    expect(res.jsonVal).toMatchObject({ success: true, rows: resultDb });
  });

  it('getDropdownData.error', async () => {
    req.query = {
      picker: 'popupUnitTest'
    };

    dao.pagingDao.getDropdownData = jest.fn(() => { throw new Error('Jest Error'); });
    await controller.pagingController.getDropdownData(req, res);

    expect(res.jsonVal).toMatchObject({ success: false, message: 'Jest Error' });
  });

  it('getDropdownData.success', async () => {
    req.query = {
      picker: 'popupUnitTest'
    };

    const resultDb = { picker: true };
    dao.pagingDao.getDropdownData = jest.fn(() => resultDb);
    await controller.pagingController.getDropdownData(req, res);

    expect(res.jsonVal).toMatchObject({ success: true, data: resultDb });
  });
});
