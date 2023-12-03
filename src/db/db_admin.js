module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('adminBean', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_admin',
        allowNull: false
      },
      fullname: {
        type: DataTypes.STRING,
        field: 'fullname',
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        field: 'username',
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        field: 'email',
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        field: 'phone',
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        field: 'password',
        allowNull: false
      },
      token: {
        type: DataTypes.STRING,
        field: 'token',
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
    }, {
      tableName: 'db_admin',
      timestamps: false
    });
  
    model.associate = () => {
    };
  
    // Terkecuali createdDate, createdBy, modifiedDate, modifiedBy
    model.attributes = [
      'id', 
      'fullname', 
      'username', 
      'email', 
      'password', 
      'token', 
      'isActive'
    ];
  
    return model;
  };
  