module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('itemBean', {
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
      item_code: {
        type: DataTypes.STRING,
        field: 'item_code',
        allowNull: true
      },
      inventory_code: {
        type: DataTypes.STRING,
        field: 'inventory_code',
        allowNull: true
      },
      stock: {
        type: DataTypes.BIGINT,
        field: 'stock',
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
      tableName: 'db_items',
      timestamps: false
    });
  
    model.associate = () => {
    };
  
    // Terkecuali createdDate, createdBy, modifiedDate, modifiedBy
    model.attributes = ['id', 'item_code', 'id_book', 'inventory_code', 'stock', 'isActive'];
  
    return model;
  };
  