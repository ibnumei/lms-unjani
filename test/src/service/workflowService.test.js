const workflowService = require('../../../src/service/workflowService');
const maintenanceDao = require('../../../src/dao/maintenanceDao');
const activityDao = require('../../../src/dao/activityDao');
const { actionWfStatus, actionOpStatus } = require('../../../src/util/Enums');

jest.mock('../../../src/dao/maintenanceDao', () => (
  {
    findMaintenanceByEntity: jest.fn(),
    updateMaintenance: jest.fn(),
    createNewMaintenance: jest.fn()
  }
));
jest.mock('../../../src/dao/activityDao', () => (
  {
    createActivity: jest.fn(),
    findActivityId: jest.fn(),
    deleteActivityById: jest.fn()
  }
));

let workflowParam;
let func;
let actualResult;
let expectedResult;
let activityId;
let note;
let actionStatus;
const entityKey = 1;
const entityName = 'entity name';
const username = 'username';
const transaction = jest.fn();
describe('.WorkflowService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('#oprationalWorkflow', () => {
    beforeEach(() => {
      func = {
        onUpdateOprational: jest.fn(),
        onNewOprational: jest.fn()
      };
    });

    it('should call functions with expected params when the workflow has entityKey', async () => {
      workflowParam = {
        entityKey: 1,
        entityName: 'name',
        body: {}
      };
      const returnFindMaintenanceByEntity = [{
        new: 'new'
      }];
      const expectedWorkflow = {
        entityKey: 1,
        entityName: 'name',
        old: returnFindMaintenanceByEntity[0].new,
        status: actionOpStatus.UPDATE,
        body: {
          status: actionOpStatus.UPDATE
        }
      };
      maintenanceDao.findMaintenanceByEntity.mockResolvedValue(returnFindMaintenanceByEntity);
      maintenanceDao.createNewMaintenance.mockResolvedValue({ id: 1 });

      await workflowService.oprationalWorkflow(workflowParam, username, func, transaction);

      expect(maintenanceDao.findMaintenanceByEntity).toHaveBeenCalledWith(workflowParam.entityName, workflowParam.entityKey, transaction);
      expect(func.onUpdateOprational).toHaveBeenCalledWith(expectedWorkflow, username, transaction);
      expect(activityDao.createActivity).toHaveBeenCalledWith(expectedWorkflow, username, 1, transaction);
    });

    it('should call functions with expected params when the workflow has no entityKey', async () => {
      workflowParam = {
        entityName: 'name',
        body: {}
      };
      const expectedWorkflow = {
        entityName: 'name',
        old: null,
        status: actionOpStatus.NEW,
        body: {
          status: actionOpStatus.NEW
        },
        entityKey: 1
      };
      func.onNewOprational.mockResolvedValue(1);
      maintenanceDao.createNewMaintenance.mockResolvedValue({ id: 1 });

      await workflowService.oprationalWorkflow(workflowParam, username, func, transaction);

      expect(func.onNewOprational).toHaveBeenCalled();
      expect(activityDao.createActivity).toHaveBeenCalledWith(expectedWorkflow, username, 1, transaction);
    });
  });

  describe('#maintenanceNoWorkflow', () => {
    it.skip('should call createNewMaintenance with params', async () => {
      const obj = {};
      note = 'note';
      const workflow = {
        old: null,
        new: JSON.stringify(obj),
        status: actionWfStatus.APPROVE,
        approvedBy: 'SYSTEM',
        approvedDate: new Date(),
        note,
        entityKey,
        entityName
      };

      await workflowService.maintenanceNoWorkflow(obj, entityKey, entityName, username, note, transaction);

      expect(maintenanceDao.createNewMaintenance).toHaveBeenCalledWith(workflow, username, transaction);
    });
  });

  describe('#actionWorkflow', () => {
    let activity;
    beforeEach(() => {
      activityId = 1;
      note = 'note';
      func = {
        onNewApprove: jest.fn(),
        onNewReject: jest.fn(),
        onUpdateApprove: jest.fn(),
        onUpdateReject: jest.fn()
      };
    });
    it('should throw error when thereis no activity', async () => {
      activityDao.findActivityId.mockResolvedValue(null);
      expectedResult = new Error(`Data Activity ${activityId} tidak di temukan`);

      actualResult = () => (
        workflowService.actionWorkflow(activityId, note, actionStatus, username, func, transaction)
      );

      await expect(actualResult()).rejects.toEqual(expectedResult);
    });

    it('should call onNewApprove when maintenance status is ActivityStatus_New and action status is ActivityStatus_Approve', async () => {
      actionStatus = actionWfStatus.APPROVE;
      activity = {
        maintenanceId: 1,
        maintenance: {
          old: 'old',
          new: 'new',
          status: actionOpStatus.NEW,
          entityKey
        }
      };
      activityDao.findActivityId.mockResolvedValue(activity);

      await workflowService.actionWorkflow(activityId, note, actionStatus, username, func, transaction);

      expect(func.onNewApprove).toHaveBeenCalledWith(activity.maintenance.old, activity.maintenance.new, username, activity.maintenance.entityKey, transaction);
      expect(maintenanceDao.updateMaintenance).toHaveBeenCalledWith(actionStatus, activity.maintenanceId, note, username, transaction);
      expect(activityDao.deleteActivityById).toHaveBeenCalledWith(activityId, transaction);
    });

    it('should call onNewApprove when maintenance status is ActivityStatus_New and action status is ActivityStatus_Reject', async () => {
      actionStatus = actionWfStatus.REJECT;
      activity = {
        maintenanceId: 1,
        maintenance: {
          old: 'old',
          new: 'new',
          status: actionOpStatus.NEW,
          entityKey
        }
      };
      activityDao.findActivityId.mockResolvedValue(activity);

      await workflowService.actionWorkflow(activityId, note, actionStatus, username, func, transaction);

      expect(func.onNewReject).toHaveBeenCalledWith(activity.maintenance.old, activity.maintenance.new, username, activity.maintenance.entityKey, transaction);
      expect(maintenanceDao.updateMaintenance).toHaveBeenCalledWith(actionStatus, activity.maintenanceId, note, username, transaction);
      expect(activityDao.deleteActivityById).toHaveBeenCalledWith(activityId, transaction);
    });

    it('should call onNewApprove when maintenance status is ActivityStatus_Update and action status is ActivityStatus_Approve', async () => {
      actionStatus = actionWfStatus.APPROVE;
      activity = {
        maintenanceId: 1,
        maintenance: {
          old: 'old',
          new: 'new',
          status: actionOpStatus.UPDATE,
          entityKey
        }
      };
      activityDao.findActivityId.mockResolvedValue(activity);

      await workflowService.actionWorkflow(activityId, note, actionStatus, username, func, transaction);

      expect(func.onUpdateApprove).toHaveBeenCalledWith(activity.maintenance.old, activity.maintenance.new, username, activity.maintenance.entityKey, transaction);
      expect(maintenanceDao.updateMaintenance).toHaveBeenCalledWith(actionStatus, activity.maintenanceId, note, username, transaction);
      expect(activityDao.deleteActivityById).toHaveBeenCalledWith(activityId, transaction);
    });

    it('should call onNewApprove when maintenance status is ActivityStatus_Update and action status is ActivityStatus_Reject', async () => {
      actionStatus = actionWfStatus.REJECT;
      activity = {
        maintenanceId: 1,
        maintenance: {
          old: 'old',
          new: 'new',
          status: actionOpStatus.UPDATE,
          entityKey
        }
      };
      activityDao.findActivityId.mockResolvedValue(activity);

      await workflowService.actionWorkflow(activityId, note, actionStatus, username, func, transaction);

      expect(func.onUpdateReject).toHaveBeenCalledWith(activity.maintenance.old, activity.maintenance.new, username, activity.maintenance.entityKey, transaction);
      expect(maintenanceDao.updateMaintenance).toHaveBeenCalledWith(actionStatus, activity.maintenanceId, note, username, transaction);
      expect(activityDao.deleteActivityById).toHaveBeenCalledWith(activityId, transaction);
    });
  });
});
