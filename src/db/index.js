// require('./src/util/Vault'); Enabled bila implementasi vault sudah ok jgn lupa buka juga di app.js dan index.js di db forlder
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  process.env.MYSQL_NAME,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      idle: 120000,
      logging: false
    },
    timezone: '+07:00'
  }
);

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
    // console.log('Load Model', model.name)
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
