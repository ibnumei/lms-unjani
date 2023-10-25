module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('rentBean', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
        allowNull: false
      },
      kode_pinjam: {
        type: DataTypes.STRING,
        field: 'kode_pinjam',
        allowNull: false
      },
      id_book: {
        type: DataTypes.BIGINT,
        field: 'id_book',
        allowNull: false,
        reference: {
          model: 'db_book',
          key:  'id_book'
        }
      },
      id_item_stock: {
        type: DataTypes.BIGINT,
        field: 'id_book',
        allowNull: false,
        reference: {
          model: 'db_book',
          key:  'id_book'
        }
      },
      tgl_pinjam: {
        type: DataTypes.DATE,
        field: 'tgl_pinjam',
        allowNull: true
      },
      tgl_kembali: {
        type: DataTypes.DATE,
        field: 'tgl_kembali',
        allowNull: true
      },
      device_log: {
        type: DataTypes.STRING,
        field: 'device_log',
        allowNull: true
      },
      status_pinjam: {
        type: DataTypes.STRING,
        field: 'status_pinjam',
        allowNull: true
      },
      location_order: {
        type: DataTypes.BOOLEAN,
        field: 'location_order',
        allowNull: true
      },
      modifiedBy: {
        type: DataTypes.STRING,
        field: 'modifiedBy',
        allowNull: true
      },
      createdBy: {
        type: DataTypes.STRING,
        field: 'createdBy',
        allowNull: true
      }
    }, {
      tableName: 'db_rent',
      timestamps: false
    });
  
    model.associate = () => {
    
    };
  
    // Terkecuali createdDate, createdBy, modifiedDate, modifiedBy
    model.attributes = ['id', 'item_code', 'id_book', 'inventory_code', 'stock', 'isActive'];
  
    return model;
  };
  