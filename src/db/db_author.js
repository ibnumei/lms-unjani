module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('authorBean', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
        allowNull: false
      },
      id_book: {
        type: DataTypes.BIGINT,
        field: 'id_book',
        allowNull: false
      },
      author_name: {
        type: DataTypes.STRING,
        field: 'author_name',
        allowNull: true
      },
      authority_type: {
        type: DataTypes.STRING,
        field: 'authority_type',
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
      }
    }, {
      tableName: 'db_author',
      timestamps: false
    });
  
    model.associate = () => {
    };
  
    // Terkecuali createdDate, createdBy, modifiedDate, modifiedBy
    model.attributes = ['id', 'id_book', 'author_name', 'authority_type', 'isActive'];
  
    return model;
  };
  