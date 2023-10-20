const moment = require('moment');
const { maintenanceBean } = require('../db/index');
const { actionWfStatus } = require('../util/Enums');

class MaintenanceDao {
  static async createNewMaintenance(body, username, t) {
    return maintenanceBean.create({
      old: body.old,
      new: body.new,
      status: body.status,
      createdBy: username,
      createdDate: moment().format(),
      rejectedBy: (body.rejectedBy) ? body.rejectedBy : null,
      rejectedDate: (body.rejectedDate) ? body.rejectedDate : null,
      approvedBy: (body.approvedBy) ? body.approvedBy : null,
      approvedDate: (body.approvedDate) ? body.approvedDate : null,
      canceledBy: (body.canceledBy) ? body.canceledBy : null,
      canceledDate: (body.canceledDate) ? body.canceledDate : null,
      note: (body.note) ? body.note : null,
      entityKey: body.entityKey,
      entityName: body.entityName
    }, { transaction: t });
  }

  static async updateMaintenance(activity, id, note, username, t) {
    return maintenanceBean.update({
      status: activity,
      approvedBy: (activity === actionWfStatus.APPROVE) ? username : null,
      approvedDate: (activity === actionWfStatus.APPROVE) ? moment().format() : null,
      rejectedBy: (activity === actionWfStatus.REJECT) ? username : null,
      rejectedDate: (activity === actionWfStatus.REJECT) ? moment().format() : null,
      note
    }, { where: { id }, transaction: t });
  }

  static async findMaintenanceByEntity(entityName, entityKey, t) {
    return maintenanceBean.findAll({
      where: { entityKey, entityName },
      order: [['id', 'DESC']],
      transaction: t
    });
  }

  static async findMaintenance(entityName, entityKey, status) {
    return maintenanceBean.findOne({
      where: { entityKey, entityName, status },
      order: [['id', 'DESC']]
    });
  }
}

module.exports = MaintenanceDao;
