import express from 'express'
const router = express.Router()
import {landing} from '../controllers/landing.js'

router.get('/', landing)

export {router};