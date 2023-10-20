const maintenanceDao = require('../../../src/dao/maintenanceDao');
const { maintenanceBean } = require('../../../src/db/index');

jest.mock('../../../src/db/index', () => (
  {
    maintenanceBean: {
      create: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn()
    }
  }
));

const username = 'username';
const transaction = jest.fn();

describe('.MaintenanceDao', () => {
  describe('#createNewMaintenance', () => {
    it('should call create function of maintenanceDao', async () => {
      const body = {};

      await maintenanceDao.createNewMaintenance(body, username, transaction);

      expect(maintenanceBean.create).toHaveBeenCalled();
    });
  });
  describe('#updateMaintenance', () => {
    it('should call findOne function with the params', async () => {
      const id = 1;
      const activity = {};
      const note = '';

      await maintenanceDao.updateMaintenance(activity, id, note, username, transaction);

      expect(maintenanceBean.update).toHaveBeenCalled();
    });
  });
  describe('#findMaintenanceByEntity', () => {
    it('should call findAll function with the params', async () => {
      const entityName = 'name';
      const entityKey = 1;

      await maintenanceDao.findMaintenanceByEntity(entityName, entityKey, transaction);

      expect(maintenanceBean.findAll).toHaveBeenCalled();
    });
  });
  describe('#findMaintenance', () => {
    it('should call findOne function with the params', async () => {
      const entityName = 'name';
      const entityKey = 1;

      await maintenanceDao.findMaintenance(entityName, entityKey, transaction);

      expect(maintenanceBean.findOne).toHaveBeenCalled();
    });
  });
});
