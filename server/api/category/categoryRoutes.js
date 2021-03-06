//Set variable name for Router to be called in api.js > server.js
var router = require('express').Router();
// Require Controller
var controller = require('./categoryController');
// Require router utility
var createRoutes = require('../../util/createRoutes');
// Require logger for logging to console
var logger = require('../../util/logger');

// Run router utility
// pass controller & router variables
createRoutes(controller, router);

module.exports = router;