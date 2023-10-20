const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const route = {};

// console.log('*** Load Route ***')
fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const model = require(path.join(__dirname, file));
    const instanceName = file.split('.')[0];
    route[instanceName] = model;
    // console.log('Route...', instanceName)
  });

module.exports = route;
