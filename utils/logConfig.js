const log4js = require('log4js');
log4js.configure({
  appenders: { cafeappserver: { type: 'file', filename: './logs/cafeappserver.log' } },
  categories: { default: { appenders: ['cafeappserver'], level: 'trace' } }
});

