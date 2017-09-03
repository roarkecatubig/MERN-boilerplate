// Require node modules
var _ = require('lodash');

//Default config object for our api
var config = {
    // Names of NODE_ENV (Node envirnoment)
    dev: 'development',
    test: 'testing',
    prod: 'production',
    port: process.env.PORT || 5000,
    // 10 days in minutes
    expireTime: 24 * 60 * 10,
    secrets: {
        jwt: process.env.JWT || 'MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgEbVzfPnZPxfAyxqE'
    }
};

// Check to see if the NODE_ENV was set, if not, then set it to dev
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
// Set config.env to whatever the NODE_ENV is
config.env = process.env.NODE_ENV;

var envConfig;
// require could error out if
// the file don't exist so lets try this statement
// and fallback to an empty object if it does error out
try {
    envConfig = require('./' + config.env);
    // just making sure the require actually
    // got something back :)
    envConfig = envConfig || {};
} catch (e) {
    envConfig = {};
}

// merge the two config files together
// the envConfig file will overwrite properties
// on the config object
module.exports = _.merge(config, envConfig);