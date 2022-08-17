const express = require('express'),
    { nanoid } = require('nanoid'),
    router = express.Router(),
    admin  = require('../controllers/admin.js'),
    { ensureAuthenticated, ensureAdminAuthenticated } = require('../middlewares/authenticate.js');

router.get('/', ensureAdminAuthenticated, admin)

module.exports = router ;