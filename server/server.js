// Require express
const express = require('express');
// Run express
const app = express();
// Get api router
const api = require('./api/api');
// Get error handler
const err = require('./middleware/err');
// Require Logger for logging to console
const logger = require('./util/logger');
// Require auth router
const auth = require('./auth/routes');
// Get config file
const config = require('./config/config');
// Require Passport for authentication and google OAuth
const passport = require('passport');

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

// Initialise passport for Google OAuth
app.use(passport.initialize());
// Require passport file and run function to get user
require('./util/passport')(passport);

// set up global error handler
app.use(err());

//Export app for testing
module.exports = app;