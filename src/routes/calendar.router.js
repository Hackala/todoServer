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

router.route('/api/month/:person/:year/:month')
    .get(ctrl.month)

router.param('id', ctrl.getId)

// router.param('person', (req, res, next, person) => { req.person = person; next() })
// router.param('year', (req, res, next, year) => { req.year = year; next() })
// router.param('month', (req, res, next, month) => { req.month = month; next() })

export default router
