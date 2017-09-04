// Morgan used for logging
const morgan = require('morgan');
// Require node modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const override = require('method-override');
// Require cookie session
const cookieSession = require('cookie-session');
// Require connect flash
const flash = require('connect-flash');
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
    app.use(passport.initialize()); // Initialise passport for Google OAuth
    app.use(passport.session());
    app.use(flash()); // use connect-flash for flash messages stored in session
    // express.static will serve everything within client as a static resource
    // also, it will serve the index.html on the root of that directory on a GET to '/'
    // app.use(express.static('client'));
};