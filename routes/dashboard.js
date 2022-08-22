const express = require('express'),
    router = express.Router(),
    { dashboard } = require('../controllers/dashboard.js'),
    { ensureAuthenticated } = require('../middlewares/authenticate.js');


module.exports = router;