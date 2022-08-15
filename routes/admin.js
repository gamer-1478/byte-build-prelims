import express from 'express'
import {nanoid} from 'nanoid'
const router = express.Router()
import {admin} from '../controllers/admin.js'
import {ensureAuthenticated, ensureAdminAuthenticated} from '../middlewares/authenticate.js'

router.get('/', ensureAdminAuthenticated, admin)

export {router};