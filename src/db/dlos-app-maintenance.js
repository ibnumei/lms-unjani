module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('maintenanceBean', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    old: DataTypes.TEXT,
    new: DataTypes.TEXT,
    status: DataTypes.STRING,
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
    rejectedBy: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'rejected_by'
    },
    rejectedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'rejected_date'
    },
    approvedBy: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'approved_by'
    },
    approvedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'approved_date'
    },
    canceledBy: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'canceled_by'
    },
    canceledDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'canceled_date'
    },
    note: DataTypes.STRING,
    entityKey: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'entity_key'
    },
    entityName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'entity_name'
    }
  }, {
    tableName: 'dlos_app_maintenance',
    timestamps: false
  });

  model.associate = ({ activityBean }) => {
    model.activity = model.belongsTo(activityBean, { as: 'activity', foreignKey: 'id', targetKey: 'maintenanceId' });
  };

  model.attributes = ['id', 'old', 'new', 'status', 'createdBy', 'createdDate', 'rejectedBy', 'rejectedDate', 'approvedBy', 'approvedDate', 'canceledBy', 'canceledDate', 'note', 'entityKey', 'entityName'];

  return model;
};
