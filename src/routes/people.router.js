import express from 'express'
import ctrl from '../controllers/people.controller'

const router = express.Router()

router.route('/api/people')
    .get(ctrl.list)
    .post(ctrl.create)

router.route('/api/people/:id')
    .get(ctrl.read)
    .put(ctrl.update)
    .patch(ctrl.patch)
    .delete(ctrl.remove)

router.param('id', ctrl.getId)

export default router
