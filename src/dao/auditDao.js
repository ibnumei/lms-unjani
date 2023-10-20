const { auditBean, Sequelize } = require('../db/index');

class AuditDao {
  static async auditCleanUp() {
    // Data yang tipe D akan di hapus, dan akan di maintence 3 bulan terakhir
    const date = new Date();
    date.setMonth(date.getMonth() - 3);

    auditBean.destroy({
      where: {
        type: 'D',
        createdDate: {
          [Sequelize.Op.lte]: date
        }
      }
    });
  }

  static async audit(entityKey, entityName, type, description, json, username, transaction) {
    const createdDate = new Date();
    const createdBy = username;
    const body = JSON.stringify(json);

    AuditDao.auditCleanUp();
    return auditBean.create({
      entityKey, entityName, type, description, body, createdDate, createdBy
    },
    {
      transaction
    });
  }

  static async auditText(entityKey, entityName, description, username, transaction) {
    const type = 'D';
    const body = null;

    return AuditDao.audit(entityKey, entityName, type, description, body, username, transaction);
  }

  static async auditJson(entityKey, entityName, description, json, username, transaction) {
    const type = 'D';
    const body = json;

    return AuditDao.audit(entityKey, entityName, type, description, body, username, transaction);
  }

  static async auditReqRes(entityKey, entityName, description, request, response, username, transaction) {
    const type = 'T';
    const body = { request, response };

    return AuditDao.audit(entityKey, entityName, type, description, body, username, transaction);
  }

  static async auditBefAft(entityKey, entityName, description, before, after, username, transaction) {
    const type = 'T';
    const body = { before, after };

    return AuditDao.audit(entityKey, entityName, type, description, body, username, transaction);
  }
}

module.exports = AuditDao;
