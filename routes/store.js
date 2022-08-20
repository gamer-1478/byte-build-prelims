const express = require('express'),
    router = express.Router(),
    {store_admin, store_admin_create, store_admin_get_product,store_admin_post_product, store_admin_delete_product}  = require('../controllers/store.js'),
    {ensureAdminAuthenticated} = require('../middlewares/authenticate.js')

router.get('/admin', store_admin)
router.post('/admin/create', store_admin_create)
router.get('/admin/create/:id', store_admin_get_product)
router.post('/admin/edit/:id', store_admin_post_product)
router.post('/admin/delete/:id', store_admin_delete_product)

module.exports = router;