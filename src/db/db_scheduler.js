module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('schedulerBean', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      field: 'type',
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      field: 'status',
      allowNull: true
    },
    seq: {
      type: DataTypes.BIGINT,
      field: 'seq',
      allowNull: true
    },
    max: {
      type: DataTypes.BIGINT,
      field: 'max',
      allowNull: true
    },
    error: {
      type: DataTypes.TEXT,
      field: 'error',
      allowNull: true
    },
    totalRows: {
      type: DataTypes.INTEGER,
      field: 'totalRows',
      allowNull: true
    },
  }, {
    tableName: 'db_scheduler',
    timestamps: false
  });

  // Terkecuali createdDate, createdBy, modifiedDate, modifiedBy
  model.attributes = [
    'id', 'type', 'status', 'seq', 'max',
    'error', 'totalRows'
  ];

  return model;
};
