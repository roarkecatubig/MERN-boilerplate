//Set variable name for Router to be called in createRoutes utility
const router = require('express').Router();
// Require Controller
const controller = require('./surveyController');
// Require logger for logging to console
const logger = require('../../util/logger');
// Check if user is logged in
const requireLogin = require('../../middleware/requireLogin');
// Check if user has enough credits
const requireCredits = require('../../middleware/requireCredits');

router.param('id', controller.params);

// Define routes
// All requests to '/api/router'
// Go to relative controller and selected method
router.route('/')
    // .get(controller.get)
    // no auth, users need to be able to sign up/login
    .post(requireLogin, requireCredits, controller.post);

// router.route('/:id')
//     .get(controller.getOne)
//     // add auth, check if updated user is current user
//     .put(checkUser, validUser, controller.put)
//     // add auth, check if user to be deleted is current user
//     .delete(checkUser, validUser, controller.delete)

// // Add router for api/users/me
// router.get('/me', checkUser, controller.me);

module.exports = router;