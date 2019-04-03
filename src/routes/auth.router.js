import express from 'express'
import auth from '../controllers/auth.controller'

const router = express.Router()

router.route('/auth/login').get(auth.login)

export default router