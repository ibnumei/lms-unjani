module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('fileBean', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
      allowNull: false
    },
    secondary_id: {
      type: DataTypes.BIGINT,
      field: 'secondary_id',
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      field: 'category',
      allowNull: true
    },
    file_name: {
      type: DataTypes.STRING,
      field: 'file_name',
      allowNull: true
    },
    file_type: {
      type: DataTypes.STRING,
      field: 'file_type',
      allowNull: true
    },
    file: {
      type: DataTypes.BLOB('medium'),
      field: 'file',
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      field: 'is_active',
      allowNull: true
    },
    modified_date: {
      type: DataTypes.DATE,
      field: 'modified_date',
      allowNull: true
    },
    modified_by: {
      type: DataTypes.STRING,
      field: 'modified_by',
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      field: 'created_date',
      allowNull: true
    },
    created_by: {
      type: DataTypes.STRING,
      field: 'created_by',
      allowNull: true
    }
  }, {
    tableName: 'db_file',
    timestamps: false
  });

  model.associate = () => {
  };

  // Terkecuali createdDate, createdBy, modifiedDate, modifiedBy
  model.attributes = ['id', 'secondary_id', 'category', 'file_name', 'file_type', 'file', 'is_active'];

  return model;
};
