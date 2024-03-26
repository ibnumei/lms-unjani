// require('./src/util/Vault'); Enabled bila implementasi vault sudah ok jgn lupa buka juga di app.js dan index.js di db forlder
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const morgan = require('morgan');
const compression = require('compression');
const timeout = require('express-timeout-handler');
const cors = require('cors');
const { errorResponse } = require('./src/response/response-message');
const winston = require('./conf/winston');
const cron = require('node-cron')

const routes = require('./src/route/index');
const { syncBookScheduler, syncItemScheduler, syncMemberScheduler } = require('./src/util/scheduler')


require('dotenv').config();

const app = express();

// Elvino : aku naikan timeout dr 29000 jadi 45000, dimana db (28800)
// untuk mencegah bila db success tapi krn timeout error kena ke client lalu di coba lagi
// data masuk jadi lebih dr 1,
// Ya memang 29000 lebih besar dr dbb 28800 tp 28800 adalah single opration belum di hitung secara keseluruhan sql
// jadi aku kasih buffer kurang lebih 15 detik

const options = {
  timeout: 45000,
  onTimeout(req, res) {
    winston.error(errorResponse.timeoutResponse);
    res.status(504).json(errorResponse.timeoutResponse);
  },
  disable: ['write', 'setHeaders', 'send', 'json', 'end']
};

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(morgan('combined', {
  stream: winston.stream
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ credentials: false, origin: '*', exposedHeaders: ['Content-Disposition'] }));
app.use(compression());
app.use(timeout.handler(options));

// Including all registered router
Object.keys(routes).forEach((key) => {
  app.use('/lms-unjani', routes[key]);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});


// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log('============================================');
console.log('Server Up and Running');
console.log('Project : lms-unjani');
console.log('Port    : 3000');
console.log('============================================');

// setInterval(syncBookScheduler, 5000);
const itemSchedulerJob = cron.schedule('0 * * * *', () => {
  syncItemScheduler();
});
const memberSchedulerJob = cron.schedule('30 7 * * *', () => {
  syncMemberScheduler();
});

itemSchedulerJob.start()
memberSchedulerJob.start()

module.exports = app;
