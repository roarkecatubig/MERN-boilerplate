// Require node modules
var jwt = require('jsonwebtoken');
// expressjwt is a wrapper around jwt that verifies our web tokens
var expressJwt = require('express-jwt');
// Require config
var config = require('../config/config');
// check if valid token through expressJwt middleware
var checkToken = expressJwt({ secret: config.secrets.jwt });
var User = require('../api/user/userModel');

// Take token with secret turn it back to what it was originally, if not send it back
exports.decodeToken = function() {
    return function(req, res, next) {
        // make it optional to place token on query string
        // if it is, place it on the headers where it should be
        // so checkToken can see it. See follow the 'Bearer 034930493' format
        // so checkToken can see it and decode it
        // if querystring has 'access_token' property
        if (req.query && req.query.hasOwnProperty('access_token')) {
            // Attach it to the authorization header
            req.headers.authorization = 'Bearer ' + req.query.access_token;
        }

        // this will call next if token is valid
        // and send error if its not. It will attached
        // the decoded token to req.user

        //Check if token is valid through express-jwt middleware
        checkToken(req, res, next);
    };
};

exports.getFreshUser = function() {
    return function(req, res, next) {
        User.findById(req.user._id)
            .then(function(user) {
                if (!user) {
                    // if no user is found, it was a valid JWT but didn't decode
                    // to a real user in our DB. Either the user was deleted
                    // since the client got the JWT, or
                    // it was a JWT from some other source
                    res.status(401).send('Unauthorized');
                } else {
                    // update req.user with fresh user from
                    // stale token data
                    req.user = user;
                    next();
                }
            }, function(err) {
                next(err);
            });
    }
};

exports.verifyUser = function() {
    return function(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        // if no username or password then stop.
        if (!username || !password) {
            res.status(400).send('You need a username and password');
            return;
        }

        // look user up in the DB so we can check
        // if the passwords match for the username
        User.findOne({ username: username })
            .then(function(user) {
                if (!user) {
                    res.status(401).send('No user with the given username');
                } else {
                    // checking the passowords here
                    // call authenticate method from User model
                    // passing posted password
                    // hash the password the same way as the current passwords got hashed
                    if (!user.authenticate(password)) {
                        res.status(401).send('Wrong password');
                    } else {
                        // if everything is good,
                        // then attach to req.user
                        // and call next so the controller
                        // can sign a token from the req.user._id
                        req.user = user;
                        next();
                    }
                }
            }, function(err) {
                next(err);
            });
    };
};

// Check if user has correct priviledges
exports.validUser = function() {
    return function(req, res, next) {
        updatedUserid = req.params.id.toString();
        currentUser = req.user._id.toString();
        // if current user is not the user which is being edited, prevent update
        if (updatedUserid !== currentUser) {
            res.status(400).send('Permission Denied');
            return;
        }
        next();
    };
};

// util method to sign tokens on signup
exports.signToken = function(id) {
    return jwt.sign(
        // Create an object with an _id
        { _id: id },
        // Pass in secret from config file
        config.secrets.jwt,
        // Set expiry date for token
        { expiresIn: config.expireTime }
    );
};