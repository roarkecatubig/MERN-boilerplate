// Require express
var express = require('express');
// Run express
var app = express();
// Get api router
var api = require('./api/api');
// Get error handler
var err = require('./middleware/err');
// Require Logger for logging to console
var logger = require('./util/logger');
// Require auth router
var auth = require('./auth/routes');
// Get config file
var config = require('./config/config');
// db.url is different depending on NODE_ENV
require('mongoose').connect(config.db.url, {
    useMongoClient: true,
    /* other options */
});

// If seed === true, then seed db
if (config.seed) {
    require('./util/seed');
}

// setup the app middlware
require('./middleware/appMiddleware')(app);

// setup the api and auth
app.use('/api/', api);
app.use('/auth', auth);

// set up global error handler
app.use(err());

//Export app for testing
module.exports = app;