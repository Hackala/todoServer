import express from 'express'
import ctrl from '../controllers/projects.controller'

const router = express.Router()

router.route('/api/projects')
    .get(ctrl.list)
    .post(ctrl.create)

router.route('/api/projects/:id')
    .get(ctrl.read)
    .put(ctrl.update)
    .delete(ctrl.remove)

router.param('id', ctrl.getId)

export default router
