import express from 'express'
import ctrl from '../controllers/calendar.controller'

const router = express.Router()

router.route('/api/calendar')
    .get(ctrl.list)
    .post(ctrl.create)

router.route('/api/calendar/:id')
    .get(ctrl.read)
    .put(ctrl.update)
    .delete(ctrl.remove)

router.param('id', ctrl.getId)

export default router
