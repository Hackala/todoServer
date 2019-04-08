import express from 'express'
import ctrl from '../controllers/teams.controller'
import auth from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/teams')
    .get(auth.signed, ctrl.list)
    .post(auth.signed, ctrl.create)

router.route('/api/teams/:id')
    .get(auth.signed, ctrl.read)
    .put(auth.signed, ctrl.update)
    .delete(auth.signed, ctrl.remove)

router.param('id', ctrl.getId)

export default router
