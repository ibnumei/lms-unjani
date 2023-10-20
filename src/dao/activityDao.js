const moment = require('moment');
const { maintenanceBean, activityBean } = require('../db/index');

class ActivityDao {
  static async createActivity(body, username, id, t) {
    return activityBean.create({
      reqType: `Activity${body.entityName}`,
      reqStatus: body.status,
      createdBy: username,
      createdDate: moment().format(),
      entityKey: body.entityKey,
      entityName: body.entityName,
      entityUrl: body.entityUrl,
      entityRest: body.entityWorkflow,
      maintenanceId: id
    }, { transaction: t });
  }

  static async findActivityId(id, t) {
    return activityBean.findOne({
      where: { id },
      include: [{ model: maintenanceBean }],
      transaction: t
    });
  }

  static async deleteActivityById(id, t) {
    return activityBean.destroy({
      where: { id },
      transaction: t
    });
  }
}

module.exports = ActivityDao;
