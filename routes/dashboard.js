const express = require('express'),
    router = express.Router(),
    { dashboard } = require('../controllers/dashboard.js'),
    { ensureAuthenticated } = require('../middlewares/authenticate.js');

router.get('/', ensureAuthenticated, dashboard);

module.exports = router;