const activityDao = require('../../../src/dao/activityDao');
const { maintenanceBean, activityBean } = require('../../../src/db/index');

jest.mock('../../../src/db/index', () => (
  {
    activityBean: {
      create: jest.fn(),
      destroy: jest.fn(),
      findOne: jest.fn()
    }
  }
));
const username = 'username';
const transaction = jest.fn();
const id = 1;

describe('.ActivityDao', () => {
  describe('#createActivity', () => {
    it('should should call create function ', async () => {
      const body = {
        status: 'status',
        entityName: 'name',
        entityKey: 1,
        entityUrl: 'url',
        entityWorkflow: 'worklfow'
      };

      await activityDao.createActivity(body, username, id, transaction);

      expect(activityBean.create).toHaveBeenCalled();
    });
  });

  describe('#findActivityId', () => {
    it('should should call findActivityId function ', async () => {
      await activityDao.findActivityId(id, transaction);

      expect(activityBean.findOne).toHaveBeenCalledWith({
        where: { id },
        include: [{ model: maintenanceBean }],
        transaction
      });
    });
  });

  describe('#deleteActivityById', () => {
    it('should should call deleteActivityById function ', async () => {
      await activityDao.deleteActivityById(id, transaction);

      expect(activityBean.destroy).toHaveBeenCalledWith({
        where: { id },
        transaction
      });
    });
  });
});
