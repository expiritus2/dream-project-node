const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.googleClientId,
    clientSecret: process.env.googleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({googleId: profile.id});
    if (existingUser) {
        done(null, existingUser);
    } else {
        const user = await new User({
            googleId: profile.id,
            userInfo: {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                emails: profile.emails
            }
        }).save();
        done(null, user);
    }
}));

router.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.cookieKey]
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id).populate('targetObject');
    done(null, user);
});

router.use(passport.initialize());
router.use(passport.session());


module.exports = router;