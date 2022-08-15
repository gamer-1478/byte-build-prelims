import express from 'express'
const router = express.Router()
import {auth_register_post, auth_register_get} from '../controllers/register.js'
import {auth_login_get, auth_login_post} from '../controllers/login.js'
import {verify_email} from '../controllers/verify.js'
import {validation} from '../middlewares/validation.js'
import {ensureAuthenticated, forwardAuthenticated} from '../middlewares/authenticate.js'

router.post('/register', validation, auth_register_post)
router.get('/register', auth_register_get)
router.get('/login', forwardAuthenticated, auth_login_get)
router.post('/login', auth_login_post)
router.get('/logout', (req, res)=>{
    req.logout()
    res.redirect('/auth/login')
})
router.get('/email-confirmation/:token', verify_email)

export {router};