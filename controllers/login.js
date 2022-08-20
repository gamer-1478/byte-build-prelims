const User = require('../schemas/userSchema.js'),
    passport = require('passport');


const auth_login_get = (req, res) => {
    res.render('auth/login', { title: "Login" })
}

const auth_login_post = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(user => {
        passport.authenticate('local', (err, user, info) => {
            if (err) throw err;
            if (!user) res.send([{ msg: info.message }]);
            else {
                req.logIn(user, (err) => {
                    if (err) throw err;
                    res.send([{ msg: "Successfully Authenticated", sucess: true }]);
                });
            }
        })(req, res, next);
    })
}

module.exports = { auth_login_get, auth_login_post }