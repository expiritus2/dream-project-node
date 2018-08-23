const mongoose = require('mongoose');
const User = mongoose.model('users');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (app) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.googleClientId,
        clientSecret: process.env.googleClientSecret,
        callbackURL: "/auth/google/callback"
    }, (accessToken, refreshToken, profile, cb) => {
        new User({googleID: profile.id}).save()
    }));
};