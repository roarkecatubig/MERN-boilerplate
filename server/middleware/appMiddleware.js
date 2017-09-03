// Morgan used for logging
var morgan = require('morgan');
// Require node modules
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var override = require('method-override');
// setup global middleware here

module.exports = function(app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(override());
    // express.static will serve everything within client as a static resource
    // also, it will serve the index.html on the root of that directory on a GET to '/'
    // app.use(express.static('client'));
};