import express from 'express'
import ctrl from '../controllers/teams.controller'
import auth from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/teams')
    .get(auth.signed, auth.canRead, ctrl.list)
    .post(auth.signed, auth.canWrite, ctrl.create)

router.route('/api/teams/:id')
    .get(auth.signed, auth.canRead, ctrl.read)
    .put(auth.signed, auth.canWrite, ctrl.update)
    .delete(auth.signed, auth.canWrite, ctrl.remove)

router.param('id', ctrl.getId)

export default router
