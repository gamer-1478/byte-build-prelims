import express from 'express'
const router = express.Router()
import {dashboard} from '../controllers/dashboard.js'
import {ensureAuthenticated} from '../middlewares/authenticate.js'

router.get('/', ensureAuthenticated, dashboard)

export {router};