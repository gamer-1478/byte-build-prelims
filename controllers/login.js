const User = require('../models/userSchema.js'),
    passport = require('passport');

const auth_login_get = (req, res) => {
    res.render('auth/login', { title: "Login" })
}

const auth_login_post = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.send("Account does not exists")
        } 
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/auth/login',
            failureFlash: true
        })(req, res, next);

    })
}

module.exports = { auth_login_get, auth_login_post }