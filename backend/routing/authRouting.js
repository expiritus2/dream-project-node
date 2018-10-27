const express = require('express');
const router = express.Router();
const passport = require('passport');
const checkAuth = require('../middleware/check-auth');

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google'), (req, res, next) => {
    res.redirect('/authorised');
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/logout');
});

router.get('/current_user', checkAuth, (req, res, next) => {
    res.send(req.user);
});

module.exports = router;