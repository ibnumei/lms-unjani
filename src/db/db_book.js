module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('bookBean', {
      id_book: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_book',
        allowNull: false
      },
      biblio_id: {
        type: DataTypes.STRING,
        field: 'biblio_id',
        allowNull: true
      },
      title: {
        type: DataTypes.STRING,
        field: 'title',
        allowNull: true
      },
      edition: {
        type: DataTypes.STRING,
        field: 'edition',
        allowNull: true
      },
      isbn_issn: {
        type: DataTypes.STRING,
        field: 'isbn_issn',
        allowNull: true
      },
      publisher_name: {
        type: DataTypes.STRING,
        field: 'publisher_name',
        allowNull: true
      },
      publish_year: {
        type: DataTypes.STRING,
        field: 'publish_year',
        allowNull: true
      },
      collation: {
        type: DataTypes.STRING,
        field: 'collation',
        allowNull: true
      },
      series_title: {
        type: DataTypes.STRING,
        field: 'series_title',
        allowNull: true
      },
      call_number: {
        type: DataTypes.STRING,
        field: 'call_number',
        allowNull: true
      },
      language_name: {
        type: DataTypes.STRING,
        field: 'language_name',
        allowNull: true
      },
      place_place: {
        type: DataTypes.STRING,
        field: 'place_place',
        allowNull: true
      },
      notes: {
        type: DataTypes.TEXT,
        field: 'notes',
        allowNull: true
      },
      image: {
        type: DataTypes.TEXT,
        field: 'image',
        allowNull: true
      },
      classification: {
        type: DataTypes.STRING,
        field: 'classification',
        allowNull: true
      },
      spec_detail_info: {
        type: DataTypes.STRING,
        field: 'spec_detail_info',
        allowNull: true
      },
      uid: {
        type: DataTypes.STRING,
        field: 'uid',
        allowNull: true
      },
      input_date: {
        type: DataTypes.STRING,
        field: 'input_date',
        allowNull: true
      },
      last_date: {
        type: DataTypes.STRING,
        field: 'last_date',
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
      tableName: 'db_book',
      timestamps: false
    });
  
    model.associate = ( {authorBean, itemBean} ) => {
      model.hasManyAuthor = model.hasMany(authorBean, { as: 'authors', foreignKey: 'id_book', targetKey: 'id_book'});
      model.hasManyItems = model.hasMany(itemBean, {as: 'items', foreignKey: 'id_book', targetKey: 'id_book'})
    };
  
    // Terkecuali createdDate, createdBy, modifiedDate, modifiedBy
    model.attributes = ['id', 'stockBuku', 'title', 'edition', 'isbn_issn', 'publisher_name', 'publish_year', 'isActive'];
  
    return model;
  };
  