// Require express router
const router = require('express').Router();
// Require Passport
const passport = require('passport');

// before we send back a jwt, lets check
// the password and username match what is in the DB
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));
// Google OAuth, send request to google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
// Retreive code from google OAuth
router.get('/google/callback', passport.authenticate('google'));
router.get('/logout', (req, res) => {
    req.logout();
    res.send(req.user);
});
router.get('/current_user', (req, res) => {
    res.send(req.user);
});


module.exports = router;