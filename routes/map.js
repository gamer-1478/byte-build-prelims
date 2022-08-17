const express = require('express'),
    router = express.Router(),
    map  = require('../controllers/map.js');

router.get('/', map)

module.exports = router;