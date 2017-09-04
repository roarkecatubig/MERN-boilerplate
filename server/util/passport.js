// Require Passport for authentication and google OAuth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Require keys file
const keys = require('../config/keys');
const mongoose = require('mongoose');
// Require user model
const User = mongoose.model('user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Check user does not already exist
    // Returns Promise, used in async code
    User.findOne({ googleId: profile.id }).then((existingUser) => {
        // if user exists
        if (existingUser) {
            // First argument is error, no error here so we pass null
            // second argument we pass user record
            done(null, existingUser);
        } else {
            // Add new user to db
            // Async so we can only run done function when user has been added using then
            new User({
                    googleId: profile.id
                })
                .save()
                .then(user =>
                    // First argument is error, no error here so we pass null
                    // second argument we pass user record)
                    done(null, user))
        }
    })
}));