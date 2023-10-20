module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('fileBean', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
      allowNull: false
    },
    dataId: {
      type: DataTypes.BIGINT,
      field: 'dataId',
      allowNull: true
    },
    file: {
      type: DataTypes.BLOB('medium'),
      field: 'file',
      allowNull: true
    },
    fileName: {
      type: DataTypes.STRING,
      field: 'file_name',
      allowNull: true
    },
    mimetype: {
      type: DataTypes.STRING,
      field: 'mimetype',
      allowNull: true
    },
    url: {
      type: DataTypes.STRING,
      field: 'url',
      allowNull: true
    },
    retry: {
      type: DataTypes.BIGINT,
      field: 'retry',
      allowNull: true
    },
    uploaded: {
      type: DataTypes.BOOLEAN,
      field: 'uploaded',
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'is_active',
      allowNull: true
    },
    modifiedDate: {
      type: DataTypes.DATE,
      field: 'modified_date',
      allowNull: true
    },
    modifiedBy: {
      type: DataTypes.STRING,
      field: 'modified_by',
      allowNull: true
    },
    createdDate: {
      type: DataTypes.DATE,
      field: 'created_date',
      allowNull: true
    },
    createdBy: {
      type: DataTypes.STRING,
      field: 'created_by',
      allowNull: true
    }
  }, {
    tableName: 'dlos_app_file',
    timestamps: false,
    indexes: [
      {
        unique: false,
        fields: ['dataId']
      }
    ]
  });

  model.associate = () => {
  };

  // Terkecuali createdDate, createdBy, modifiedDate, modifiedBy
  model.attributes = ['id', 'dataId', 'file', 'fileName', 'mimetype', 'url', 'retry', 'uploaded', 'isActive'];

  return model;
};
