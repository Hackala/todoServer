import express from 'express'

const router = express.Router()

const getName = (req, res, next, image) => { req.image = image; next() }

const getImage = (req, res) => {
    const picture = require('../../dist/images/' + req.image + '.jpg')
    res.status(200).sendFile(picture)
}

router.route('/images/:image').get(getImage)

router.param('image', getName)

export default router
