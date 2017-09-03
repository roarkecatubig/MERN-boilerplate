// Require express router
var router = require('express').Router();
// Require verifyUser method from auth file
var verifyUser = require('./auth').verifyUser;
// Require auth controller
var controller = require('./controller');

// before we send back a jwt, lets check
// the password and username match what is in the DB
router.post('/signin', verifyUser(), controller.signin);

module.exports = router;