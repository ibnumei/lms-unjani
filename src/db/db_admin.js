module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('adminBean', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_admin',
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
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
      },
      password: {
        type: DataTypes.STRING,
        field: 'password',
        allowNull: true
      },
    }, {
      tableName: 'db_admin',
      timestamps: false
    });
  
    model.associate = () => {
    };
  
    // Terkecuali createdDate, createdBy, modifiedDate, modifiedBy
    // model.attributes = ['id', 'nama', 'jurusan', 'email', 'noHandphone', 'password', 'statusAnggota', 'isActive', 'token'];
  
    return model;
  };
  