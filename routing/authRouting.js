const passport = require('passport');
const checkAuth = require('../middleware/check-auth');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google'), (req, res, next) => {
        res.redirect('/');
    });

    app.get('/auth/logout', (req, res, next) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', checkAuth, (req, res, next) => {
        res.send(req.user);
    });
};