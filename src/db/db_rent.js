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
      id_member: {
        type: DataTypes.BIGINT,
        field: 'id_member',
        allowNull: false,
        reference: {
          model: 'db_member',
          key:  'id'
        }
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
      item_code: {
        type: DataTypes.BIGINT,
        field: 'id_item_stock',
        allowNull: false,
        reference: {
          model: 'db_item',
          key:  'item_code'
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
        type: DataTypes.BOOLEAN,
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
  
    model.associate = ( {}) => {
      // model.hasManyBook = model.hasMany(authorBean, { as: 'authors', foreignKey: 'id_book', targetKey: 'id_book'});
      // model.hasManyItems = model.hasMany(itemBean, {as: 'items', foreignKey: 'id_book', targetKey: 'id_book'})
    };
  
    // Terkecuali createdDate, createdBy, modifiedDate, modifiedBy
    model.attributes = ['id', 'kode_pinjam', 'id_member', 'id_book', 'item_code', 'tgl_pinjam', 'tgl_kembali','device_log', 'status_pinjam','location_order'];
  
    return model;
  };
  