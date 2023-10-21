/* eslint-disable guard-for-in,no-restricted-syntax,no-await-in-loop */
const fs = require('fs');
const crypto = require('crypto');
const stream = require('stream');
const moment = require('moment');
const momentTz = require('moment-timezone');
const logger = require('../../conf/winston');
const Query = require('./Query');
const Where = require('./Where');
const { sequelize, Sequelize } = require('../db/index');

const logError = (at, e) => {
  if (e === null || e === undefined) {
    logger.error(at);
  } else {
    const exception = {};
    const keys = Object.getOwnPropertyNames(e);
    keys.forEach((key) => {
      exception[key] = e[key];
    });
    logger.error({ at, exception });
  }
};

const logDebugReq = (at, req, e) => {
  const parameter = (req) ? JSON.stringify({ body: req.body, params: req.params, query: req.query }) : null;
  if (e === null || e === undefined) {
    logger.debug({ at, parameter });
  } else {
    const exception = {};
    const keys = Object.getOwnPropertyNames(e);
    keys.forEach((key) => {
      exception[key] = e[key];
    });

    logger.debug({ at, parameter, exception });
  }
};

const logDebug = (at, e) => {
  if (e === null || e === undefined) {
    logger.debug(at);
  } else {
    const exception = {};
    const keys = Object.getOwnPropertyNames(e);
    keys.forEach((key) => {
      exception[key] = e[key];
    });

    logger.debug({ at, exception });
  }
};

const forEach = async (array, callback) => {
  for (let index = 0; index < array.length; index += 1) {
    await callback(array[index], index, array);
  }
};

const empty = (value) => value === undefined || value === null || value === '';

const printMemoryUsage = (messageParam) => {
  let message = messageParam;
  const used = process.memoryUsage();
  const mem = {};
  for (const key in used) {
    mem[key] = `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`;
  }
  message = message === undefined ? '' : `${message},`;
  logger.error(
    `${message} memory Usage [${mem.rss}, ${mem.heapTotal}, ${mem.heapUsed}, ${mem.external}]`
  );
};

const encodeFileBase64 = (file) => {
  const bitmap = fs.readFileSync(file);
  // eslint-disable-next-line no-buffer-constructor
  return new Buffer(bitmap).toString('base64');
};

const decodeFileBase64 = (base64str, file) => {
  // eslint-disable-next-line no-buffer-constructor
  const bitmap = new Buffer(base64str, 'base64');
  fs.writeFileSync(file, bitmap);
};

const tomorrowStartOfDay = () => {
  const tomorrow = new Date();
  tomorrow.setHours(0);
  tomorrow.setMinutes(0);
  tomorrow.setSeconds(0);
  tomorrow.setMilliseconds(0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

const cleanObject = (src, props) => {
  const obj = {};
  props.forEach((prop) => {
    const arr = prop.split('.');
    if (arr.length === 1) {
      obj[prop] = src[prop];
    } else {
      // buat untuk nested get data
      // arr.forEach(sprop => {
      //   console.log(sprop);
      // });
    }
  });

  return obj;
};

const auditTrail = (dataParam, pk, username) => {
  const data = dataParam;
  if (data[pk]) {
    data.modifiedBy = username;
    data.modifiedDate = new Date();
  } else {
    data.createdBy = username;
    data.createdDate = new Date();
  }
  return data;
};

const insertUpdate = async (dao, dataParam, pk, username, t) => {
  const data = dataParam;
  if (data[pk]) {
    data.modifiedBy = username;
    data.modifiedDate = new Date();

    const primaryKey = {};
    primaryKey[pk] = data[pk];

    const updatedAttr = { ...data };
    delete updatedAttr[pk];
    await dao.update(updatedAttr, { where: primaryKey, transaction: t });
    return data;
  }
  data.createdBy = username;
  data.createdDate = new Date();

  const e = await dao.create(data, { transaction: t });
  data[pk] = e[pk];
  return e;
};

const bulkInsertUpdate = (dao, completedData, attributesToUpdate, t) => {
  const attributes = attributesToUpdate.concat(['modifiedBy', 'modifiedDate']);
  return dao.bulkCreate(completedData, { updateOnDuplicate: attributes, transaction: t });
};

const isEmptyObject = (obj) => {
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

const encrypt = (text) => {
  const key = 'btpn.chronos.k3mb4nggul4';
  const encryptCipheriv = crypto.createCipheriv('des-ede3', key, '');
  let theCipher = encryptCipheriv.update(text, 'utf8', 'base64');
  theCipher += encryptCipheriv.final('base64');
  return theCipher;
};

const decrypt = (text) => {
  const key = 'btpn.chronos.k3mb4nggul4';
  const decipher = crypto.createDecipheriv('des-ede3', key, '');
  return decipher.update(text, 'base64', 'utf8');
};

const QueryBuilder = () => new Query();

const WhereBuilder = () => new Where();

const userTokens = {};

const getFileExt = (filename) => {
  const i = filename.lastIndexOf('.');
  return (i < 0) ? '' : filename.substr(i);
};

const downloadFile = (res, result) => {
  const contents = Buffer.from(result.file, 'base64');
  const streamPassThrough = new stream.PassThrough();
  streamPassThrough.end(contents);

  const ext = getFileExt(result.fileName);
  res.set('Content-disposition', `attachment; filename=${result.fileName}`);
  res.set('Content-type', ext);
  streamPassThrough.pipe(res);
};

const multipleUpload = async (data, dao, regex = /\.(pdf|doc|docx|xls|xlsx)$/, errorMessage, t) => {
  const response = { success: true, message: null };
  try {
    if (data.files.length > 0) {
      for (const item of data.files) {
        if (!item.originalname.match(regex)) {
          response.success = false;
          response.message = `${item.originalname} gagal disimpan. ${errorMessage}`;
          return response;
        }
        if (item.id) {
          // eslint-disable-next-line no-continue
          continue;
        } else {
          const file = {
            dataId: data.dataId,
            file: item.buffer,
            fileName: item.originalname,
            mimetype: `data:${item.mimetype};base64,`
          };
          const appfile = await dao.fileDao.insert(file, data.username, t);
          if (appfile.id) {
            const dataRelation = {
              label: data.label ? data.label : null,
              relationId: data.relationId ? data.relationId : null,
              fileId: appfile.id
            };
            await dao.relationDao.saveDocument(dataRelation, data.username, t);
          } else {
            response.success = false;
            response.message = `Gagal upload document ${data.label}` ? data.label : '';
            return response;
          }
        }
      }
    }
    return response;
  } catch (error) {
    response.success = false;
    response.message = `Gagal upload document ${data.label}` ? data.label : '';
    return response;
  }
};

const timeDiff = (newestDate, olderDate, dayInMonth = 30, dayInYear = 365) => {
  const milisecond = Math.floor(newestDate - olderDate);
  const second = Math.floor(milisecond / 1000);
  const minute = Math.floor(second / 60);
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);
  const month = Math.floor(day / dayInMonth);
  const year = Math.floor(day / dayInYear);

  return {
    milisecond,
    second,
    minute,
    hour,
    day,
    month,
    year
  };
};

const encrypt2 = (text) => {
  const algorithm = 'aes-256-ctr';
  const secretKey = 'infrastructure.losbb.k3mb4nggul4';
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return JSON.stringify({
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  });
};

const decrypt2 = (param) => {
  const hash = JSON.parse(param);
  const algorithm = 'aes-256-ctr';
  const secretKey = 'infrastructure.losbb.k3mb4nggul4';
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
  return decrpyted.toString();
};

const clone = (source) => JSON.parse(JSON.stringify(source));

const findOne = async (query, defaultReturn) => {
  const result = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
  if (!result || result.length === 0) {
    if (defaultReturn) {
      return defaultReturn;
    }
    return {};
  }
  return result[0];
};

const findAll = async (query, defaultReturn) => {
  const result = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
  if (!result || result.length === 0) {
    if (defaultReturn) {
      return defaultReturn;
    }
    return [];
  }
  return result;
};

const convertDateToAsiaTimezone = (date) => (
  /* this method to convert date to Asia/jakarta timezone
     ex input  :  2021-03-23T04:40:42.645Z
        output : 2021-03-23T11:40:42+07:00 */

  new Date(momentTz.tz(date, 'Asia/Jakarta'))
);

const formatDate = (date, format) => (
  /* this method to format date
     ex input  : 2021-03-23T04:47:52.671Z
        output : 23-Mar-2021 / 11:47  */
  moment(date).format(format)
);

const convertZoneAndFormatDate = (date, format) => {
  /* this method to convert and format date to Asia/jakarta timezone
     ex input  : 2021-03-23T04:52:29.346Z
        output : 23-Mar-2021 / 11:52 */

  const convertDate = convertDateToAsiaTimezone(date);
  const convertFormatDate = formatDate(convertDate, format);
  return convertFormatDate;
};

module.exports = {
  forEach,
  logError,
  logDebug,
  logDebugReq,
  empty,
  printMemoryUsage,
  encodeFileBase64,
  decodeFileBase64,
  tomorrowStartOfDay,
  cleanObject,
  auditTrail,
  insertUpdate,
  isEmptyObject,
  encrypt,
  decrypt,
  QueryBuilder,
  WhereBuilder,
  userTokens,
  getFileExt,
  downloadFile,
  multipleUpload,
  timeDiff,
  clone,
  encrypt2,
  decrypt2,
  findOne,
  findAll,
  convertDateToAsiaTimezone,
  formatDate,
  convertZoneAndFormatDate,
  bulkInsertUpdate
};
