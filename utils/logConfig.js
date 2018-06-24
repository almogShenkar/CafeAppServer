const log4js = require('log4js');
log4js.configure({
  appenders: { cafeappserver: { type: 'file', filename: './cafe-logs/cafeappserver.txt' } },
  categories: { default: { appenders: ['cafeappserver'], level: 'trace' } }
});

