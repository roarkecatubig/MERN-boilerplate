// Require Passport for authentication and google OAuth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Require keys file
const keys = require('../config/keys');
const mongoose = require('mongoose');
// Require user model
const User = mongoose.model('user');

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    new User({
        googleId: profile.id
    }).save();
}));