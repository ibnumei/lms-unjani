module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('userBean', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING,
      field: 'nama',
      allowNull: true
    },
    jurusan: {
      type: DataTypes.STRING,
      field: 'jurusan',
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      field: 'email',
      allowNull: true
    },
    noHandphone: {
      type: DataTypes.STRING,
      field: 'noHandphone',
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      field: 'password',
      allowNull: true
    },
    statusAnggota: {
      type: DataTypes.STRING,
      field: 'statusAnggota',
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'isActive',
      allowNull: true
    },
    modifiedDate: {
      type: DataTypes.DATE,
      field: 'modifiedDate',
      allowNull: true
    },
    modifiedBy: {
      type: DataTypes.STRING,
      field: 'modifiedBy',
      allowNull: true
    },
    createdDate: {
      type: DataTypes.DATE,
      field: 'createdDate',
      allowNull: true
    },
    createdBy: {
      type: DataTypes.STRING,
      field: 'createdBy',
      allowNull: true
    },
    token: {
      type: DataTypes.STRING,
      field: 'token',
      allowNull: true
    }
  }, {
    tableName: 'db_anggota',
    timestamps: false
  });

  model.associate = () => {
  };

  // Terkecuali createdDate, createdBy, modifiedDate, modifiedBy
  model.attributes = ['id', 'nama', 'jurusan', 'email', 'noHandphone', 'password', 'statusAnggota', 'isActive', 'token'];

  return model;
};
