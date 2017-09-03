// Require express router
const router = require('express').Router();
// Require verifyUser method from auth file
const verifyUser = require('./auth').verifyUser;
// Require auth controller
const controller = require('./controller');
// Require Passport
const passport = require('passport');

// before we send back a jwt, lets check
// the password and username match what is in the DB
router.post('/signin', verifyUser(), controller.signin);
// Google OAuth, send request to google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
// Retreive code from google OAuth
router.get('/google/callback', passport.authenticate('google'));

module.exports = router;