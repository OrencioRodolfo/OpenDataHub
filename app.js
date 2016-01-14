"use strict";

/**
 * Module dependencies.
 */

var express  = require('express'),
    glob     = require('glob'),
    mongoose = require('mongoose'),
    session  = require('express-session');
    // path        = require('path');
    // http        = require('http');
    // json2csv    = require('json2csv');
    // fs          = require('node-fs'); // File system library
    // config      = require('./config/config.' + app.get('env')); // Global configuration file
    // dateFormat  = require('dateformat'); // Global dateFormat library
    // moment      = require('moment'); // http: //momentjs.com/docs/
    // url         = require('url'); // http:    //momentjs.com/docs/
    // progressBar = require('progress');
    // activityLog = require('user/activityLog.js');
    // mailer      = require('mailer'); // Global mailer file

/**
 * Globals
 */
GLOBAL.config   = require('./config/config');
GLOBAL.session  = {};
GLOBAL.mongo    = require('mongodb');
GLOBAL.mongoose = require('mongoose');
GLOBAL.Schema   = mongoose.Schema;

/**
 * Libs
 */
GLOBAL.utils = require('./app/libs/utilities');

/**
 * Models require
 */
var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

/**
 * Setting application
 */
var app = express();


/**
* Session management
*/
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// @TODO - evaluate authentication
app.use(function (req, res, next) {
  if (app.get('env') === 'development') {
    // simulating login
    req.session.logged_in = true;
    req.session.name      = "Rodolfo Gonçalves";
    req.session.user_id 	= '53fa47f3fbce10512ee32985';
  }

  next();
});

require('./config/express')(app, config);

/**
 * MongoDB connection
 */
mongoose.connect('mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.database);

var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db.database);
});

/**
 * Launch application
 */
app.listen(config.web.port, function () {
  console.log('Express server listening on port ' + config.web.port);
});
