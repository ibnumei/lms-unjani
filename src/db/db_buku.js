module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('bookBean', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
        allowNull: false
      },
      stockBuku: {
        type: DataTypes.STRING,
        field: 'stockBuku',
        allowNull: true
      },
      lokasiBuku: {
        type: DataTypes.STRING,
        field: 'lokasiBuku',
        allowNull: true
      },
      pengarang: {
        type: DataTypes.STRING,
        field: 'pengarang',
        allowNull: true
      },
      penerbit: {
        type: DataTypes.STRING,
        field: 'penerbit',
        allowNull: true
      },
      jenisBuku: {
        type: DataTypes.STRING,
        field: 'jenisBuku',
        allowNull: true
      },
      tahunTerbit: {
        type: DataTypes.STRING,
        field: 'tahunTerbit',
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
      tableName: 'db_buku',
      timestamps: false
    });
  
    model.associate = () => {
    };
  
    // Terkecuali createdDate, createdBy, modifiedDate, modifiedBy
    model.attributes = ['id', 'stockBuku', 'lokasiBuku', 'pengarang', 'penerbit', 'jenisBuku', 'tahunTerbit', 'isActive'];
  
    return model;
  };
  