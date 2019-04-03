import express from 'express'
import customersCtrl from '../controllers/customers.controller'
import auth from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/customers')
    .get(auth.signed, customersCtrl.list)
    .post(auth.signed, customersCtrl.create)

router.route('/api/customers/:id')
    .get(auth.signed, customersCtrl.read)
    .put(auth.signed, customersCtrl.update)
    .delete(auth.signed, customersCtrl.remove)

router.param('id', customersCtrl.getId)

export default router
