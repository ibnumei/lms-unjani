module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('schedulerDetailBean', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
      allowNull: false
    },
    scheduler_id: {
      type: DataTypes.STRING,
      field: 'scheduler_id',
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      field: 'notes',
      allowNull: true
    },
    json: {
      type: DataTypes.TEXT,
      field: 'json',
      allowNull: true
    }
  }, {
    tableName: 'db_scheduler_detail',
    timestamps: false
  });

  model.associate = () => {
  };

  // Terkecuali createdDate, createdBy, modifiedDate, modifiedBy
  model.attributes = ['id', 'scheduler_id', 'notes', 'json'];

  return model;
};
