module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('auditBean', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    entityKey: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'entityKey'
    },
    entityName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'entityName'
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'type'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'description'
    },
    body: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'body'
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'createdBy'
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'createdDate'
    }
  }, {
    tableName: 'dlos_app_audit',
    timestamps: false
  });

  model.associate = () => {};

  model.attributes = ['id', 'entityKey', 'entityName', 'type', 'description', 'body'];

  return model;
};
