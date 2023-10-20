module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('activityBean', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    reqType: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'req_type'
    },
    reqStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'req_status'
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'created_by'
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_date'
    },
    entityKey: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'entity_key'
    },
    entityName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'entity_name'
    },
    entityUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'entity_url'
    },
    entityRest: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'entity_rest'
    },
    maintenanceId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'maintenance_id',
      reference: {
        model: 'dlos_app_maintenance',
        key: 'id'
      }
    }
  }, {
    tableName: 'dlos_app_activity',
    timestamps: false
  });

  model.associate = ({ maintenanceBean }) => {
    model.maintenance = model.hasOne(maintenanceBean, { as: 'maintenance', foreignKey: 'maintenanceId', targetKey: 'id' });
  };

  model.attributes = ['id', 'reqType', 'reqStatus', 'createdBy', 'createdDate', 'entityKey', 'entityName', 'entityUrl', 'entityRest', 'maintenanceId'];

  return model;
};
