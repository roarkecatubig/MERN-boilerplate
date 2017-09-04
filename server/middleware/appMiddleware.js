// Morgan used for logging
var morgan = require('morgan');
// Require node modules
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var override = require('method-override');
// Require cookie session
const cookieSession = require('cookie-session');
// Require Passport for authentication and google OAuth
const passport = require('passport');
// Require keys file
const keys = require('../config/keys');
// setup global middleware here

module.exports = function(app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(override());
    // use cookie sessions
    app.use(
        cookieSession({
            maxAge: 30 * 24 * 60 * 60 * 1000,
            keys: [keys.cookieKey]
        })
    );
    // Initialise passport for Google OAuth
    app.use(passport.initialize());
    app.use(passport.session());
    // express.static will serve everything within client as a static resource
    // also, it will serve the index.html on the root of that directory on a GET to '/'
    // app.use(express.static('client'));
};