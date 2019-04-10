import _ from 'lodash'
import request from 'request'
import jwt from 'jsonwebtoken'
import unit from '../database/unitOfWork'
import config from '../config'
import helper from '../helpers/auth.helper'

const logout = (req, res) => {
    config.token = 'x'
    config.currentUser = { id: '', name: '', sub: '', cli: '', scopes: [{ role: '', action: '', team: '' }] }
    res.redirect('/')
}

const login = (req, res) => {
    let token = req.query.token
    if (!token) {
        request.get({
            url: config.identity,
            headers: { client: 'TK' }
        }, (err, result) => {
            res.status(200).send(result.body)
        })
    } else {
        jwt.verify(token, config.secret, (err, result) => {
            if (err) {
                result.status(401).send('Invalid token')
            } else {
                config.token = token
                config.currentUser = result
                let exp = result.exp - (new Date().getTime() / 1000)
            }
        })
        res.redirect('/')
    }
}

const signed = (req, res, next) => {
    if(!req.headers.authorization) {
        res.status(401).send('Access denied')
    } else {
        let token = req.headers.authorization.substring(7)
        jwt.verify(token, config.secret, (err, result) => {
            if (err) {
                res.status(401).send('Access denied')
            } else {
                config.token = token
                config.currentUser = result
                // let exp = result.exp - (new Date().getTime() / 1000)
                next()
            }
        })
    }
}

const canRead = (req, res, next) => {
    if (helper.foundAny(config.currentUser.scopes, 'admin,guest,lead')) {
        next()
    } else {
        helper.canRead(helper.getUrl(req.url), req.id, (result) => {
            if (result) {
                next()
            } else {
                res.status(401).send('ACCESS DENIED!')
            }
        })
    }
}


const canWrite = (req, res, next) => {
    if (helper.foundAny(config.currentUser.scopes, 'admin')) {
        next()
    } else {
        if (helper.canWrite(helper.getUrl(req.url), req.id)) {
            next()
        } else {
            res.status(401).send('ACCESS DENIED!')
        }
    }
}

export default { login, logout, signed, canRead, canWrite }