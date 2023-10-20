const { maintenanceDao, activityDao } = require('../dao/index');
const { actionWfStatus, actionOpStatus } = require('../util/Enums');

class WorkflowService {
  // { old, new, entityKey, entityName, entityUrl }
  static async oprationalWorkflow(workflowParam, username, func, t) {
    const workflow = workflowParam;
    if (workflow.entityKey) {
      const prevData = await maintenanceDao.findMaintenanceByEntity(workflow.entityName,
        workflow.entityKey, t);
      workflow.old = (prevData.length > 0) ? prevData[0].new : null;
      workflow.status = actionOpStatus.UPDATE;
    } else {
      workflow.old = null;
      workflow.status = actionOpStatus.NEW;
    }
    workflow.body.status = workflow.status;
    if (workflow.status === actionOpStatus.NEW) {
      workflow.entityKey = await func.onNewOprational(workflow, username, t);
    }
    if (workflow.status === actionOpStatus.UPDATE) {
      await func.onUpdateOprational(workflow, username, t);
    }

    const maintenanceData = await maintenanceDao.createNewMaintenance(workflow, username, t);
    await activityDao.createActivity(workflow, username, maintenanceData.id, t);
  }

  static async actionWorkflow(activityId, note, actionStatus, username, func, t) {
    const activity = await activityDao.findActivityId(activityId, t);
    if (activity === null) throw Error(`Data Activity ${activityId} tidak di temukan`);

    const { maintenance } = activity;

    if (maintenance.status === actionOpStatus.NEW) {
      if (actionStatus === actionWfStatus.APPROVE) {
        await func.onNewApprove(maintenance.old, maintenance.new, username, maintenance.entityKey, t);
      }
      if (actionStatus === actionWfStatus.REJECT) {
        await func.onNewReject(maintenance.old, maintenance.new, username, maintenance.entityKey, t);
      }
    }

    if (maintenance.status === actionOpStatus.UPDATE) {
      if (actionStatus === actionWfStatus.APPROVE) {
        await func.onUpdateApprove(maintenance.old, maintenance.new, username, maintenance.entityKey, t);
      }
      if (actionStatus === actionWfStatus.REJECT) {
        await func.onUpdateReject(maintenance.old, maintenance.new, username, maintenance.entityKey, t);
      }
    }

    await maintenanceDao.updateMaintenance(actionStatus, activity.maintenanceId, note, username, t);
    await activityDao.deleteActivityById(activityId, t);
  }

  static async maintenanceNoWorkflow(obj, entityKey, entityName, username, note, t) {
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

    await maintenanceDao.createNewMaintenance(workflow, username, t);
  }
}

module.exports = WorkflowService;
