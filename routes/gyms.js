const express = require('express'),
    router = express.Router(),
    { gym_admin, gym, gym_admin_post } = require('../controllers/gyms.js'),
    { ensureAdminAuthenticated, ensureAuthenticated } = require('../middlewares/authenticate.js');

router.get('/', ensureAuthenticated, gym)
router.get('/admin', ensureAdminAuthenticated, gym_admin)
router.post('/admin/create', ensureAdminAuthenticated, gym_admin_post)

module.exports = router