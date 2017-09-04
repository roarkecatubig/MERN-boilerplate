//Set variable name for Router to be called in createRoutes utility
var router = require('express').Router();
// Require Controller
var controller = require('./userController');
// Require router utility
var createRoutes = require('../../util/createRoutes');
// Require logger for logging to console
var logger = require('../../util/logger');
// require auth file for auth methods
var auth = require('../../auth/auth');
var passport = require('passport');

var checkUser = [
    // Check the user has valid token
    auth.decodeToken(),
    // Add user to request object
    auth.getFreshUser()
];

var validUser = auth.validUser();

router.param('id', controller.params);

// Define routes
// All requests to '/api/router'
// Go to relative controller and selected method
router.route('/')
    .get(controller.get)
    // no auth, users need to be able to sign up/login
    .post(passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

router.route('/:id')
    .get(controller.getOne)
    // add auth, check if updated user is current user
    .put(checkUser, validUser, controller.put)
    // add auth, check if user to be deleted is current user
    .delete(checkUser, validUser, controller.delete)

// Add router for api/users/me
router.get('/me', checkUser, controller.me);

module.exports = router;