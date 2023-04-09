import express from 'express'
import ctrl from '../controllers/todo.controller'

const router = express.Router()

router.route('/api/todo')
    .get(ctrl.list)
    .post(ctrl.create)

router.route('/api/todo/:id')
    .get(ctrl.read)
    .put(ctrl.update)
    .delete(ctrl.remove)

router.param('id', ctrl.getId)

export default router
