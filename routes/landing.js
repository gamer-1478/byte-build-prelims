const express = require('express'),
    router = express.Router(),
    landing  = require('../controllers/landing.js');

router.get('/', landing)

module.exports = router;