//Set variable name for Router to be called in createRoutes utility
const router = require('express').Router();
// Require Controller
const controller = require('./stripeController');
// Require logger for logging to console
const logger = require('../../util/logger');
// Check if user is logged in
const requireLogin = require('../../middleware/requireLogin');

// router.param('id', controller.params);

// Define routes
// All requests to '/api/router'
// Go to relative controller and selected method
router.route('/')
    .post(requireLogin, controller.post);

module.exports = router;