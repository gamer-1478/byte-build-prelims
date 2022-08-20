const express = require('express'),
    router = express.Router(),
    { auth_register_post, auth_register_get } = require('../controllers/register.js'),
    { auth_login_get, auth_login_post } = require('../controllers/login.js'),
    validation  = require('../middlewares/validation.js'),
    { ensureAuthenticated, forwardAuthenticated } = require('../middlewares/authenticate.js');

router.post('/register', auth_register_post)
router.get('/register', auth_register_get)

router.get('/login', forwardAuthenticated, auth_login_get)
router.post('/login', auth_login_post)

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/auth/login')
})

module.exports = router;