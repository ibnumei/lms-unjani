const appRoot = require('app-root-path');
const winston = require('winston');
require('dotenv').config();

const logInfo = 'info';
const logLevel = 'debug';
const logMaxSize = '5242880';
const logMaxFile = '5';
const logFile = '/logs/app.log';
const errorLogFile = '/logs/error.log';

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: logInfo,
    filename: `${appRoot}${logFile}`,
    handleExceptions: true,
    json: true,
    maxsize: logMaxSize,
    maxFiles: logMaxFile,
    colorize: false
  },
  errorFile: {
    level: 'error',
    filename: `${appRoot}${errorLogFile}`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: true
  },
  console: {
    level: logLevel,
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

// instantiate a new Winston Logger with the settings defined above
// var logger = new winston.Logger({
// eslint-disable-next-line new-cap
const logger = new winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
    new winston.transports.File(options.errorFile)
  ],
  exitOnError: false // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  // eslint-disable-next-line no-unused-vars
  write(message, encoding) {
    logger.info(message);
  }
};

module.exports = logger;
