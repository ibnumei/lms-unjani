module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('memberBean', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
      allowNull: false
    },
    member_id: {
      type: DataTypes.STRING,
      field: 'member_id',
      allowNull: true
    },
    member_name: {
      type: DataTypes.STRING,
      field: 'member_name',
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      field: 'gender',
      allowNull: true
    },
    member_type_name: {
      type: DataTypes.STRING,
      field: 'member_type_name',
      allowNull: true
    },
    member_mail_address: {
      type: DataTypes.STRING,
      field: 'member_mail_address',
      allowNull: true
    },
    member_email: {
      type: DataTypes.STRING,
      field: 'member_email',
      allowNull: true
    },
    member_image: {
      type: DataTypes.STRING,
      field: 'member_image',
      allowNull: true
    },
    pin: {
      type: DataTypes.STRING,
      field: 'pin',
      allowNull: true
    },
    member_since_date: {
      type: DataTypes.STRING,
      field: 'member_since_date',
      allowNull: true
    },
    register_date: {
      type: DataTypes.STRING,
      field: 'register_date',
      allowNull: true
    },
    expire_date: {
      type: DataTypes.STRING,
      field: 'expire_date',
      allowNull: true
    },
    member_notes: {
      type: DataTypes.STRING,
      field: 'member_notes',
      allowNull: true
    },
    input_date: {
      type: DataTypes.STRING,
      field: 'input_date',
      allowNull: true
    },
    last_update: {
      type: DataTypes.STRING,
      field: 'last_update',
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
    hasLoggedIn: {
      type: DataTypes.BOOLEAN,
      field: 'hasLoggedIn',
      allowNull: true
    },
    tgl_join: {
      type: DataTypes.DATE,
      field: 'tgl_join',
      allowNull: true
    },
    bebas_pustaka: {
      type: DataTypes.BOOLEAN,
      field: 'bebas_pustaka',
      allowNull: true
    },
  }, {
    tableName: 'db_member',
    timestamps: false
  });

  model.associate = () => {
  };

  // Terkecuali createdDate, createdBy, modifiedDate, modifiedBy
  // model.attributes = ['id', 'nama', 'jurusan', 'email', 'noHandphone', 'password', 'statusAnggota', 'isActive', 'token'];

  return model;
};
