// Entry point for our server

// Setup config first before anything else by requiring it
var config = require('./server/config/config');
var app = require('./server/server');
// Logger adds color to console logs
// Logs obects as json and can be conditionally turned off so you don't need to erase all calls to it
var logger = require('./server/util/logger');

// Get port number from config, depending on the server
app.listen(config.port);
logger.log('Listening on port ' + config.port);