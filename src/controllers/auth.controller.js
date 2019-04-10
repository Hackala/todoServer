import _ from 'lodash'
import request from 'request'
import jwt from 'jsonwebtoken'
import unit from '../database/unitOfWork'
import config from '../config'

const getUrl = (url) => {
    if (url.substring(0, 5) !== '/api/') return ''
    url = url.substring(5)
    let i = url.indexOf('/')
    if (i > 0) url = url.substring(0, i)
    return url
}

const logout = (req, res) => {
    config.token = 'x'
    config.currentUser = { id: '', name: '', sub: '', cli: '', scopes: [{ role: '', action: '', team: '' }] }
    res.redirect('/')
}

const login = (req, res) => {
    let token = req.query.token
    if (!token) {
        request.get({
            url: 'http://localhost:5000/login',
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
    let token = req.headers.authorization.substring(7)
    if (!config.token) {
        res.status(401).send('Access denied')
    } else {
        jwt.verify(token, config.secret, (err, result) => {
            if (err) {
                res.status(401).send('Access denied')
            } else {
                config.token = token
                config.currentUser = result
                let exp = result.exp - (new Date().getTime() / 1000)
                next()
            }
        })
    }
}

const canRead = (req, res, next) => {
    let canRead = false
    let found = _.some(config.currentUser.scopes, (e)=> _.includes('admin,guest,lead'))
    console.log(found)
    config.currentUser.scopes.forEach((s) => {
        if (s.role === 'admin' || s.role === 'guest' || s.role === 'lead') {
            canRead = true
            return next()
        }
    })
    console.log(canRead)
    if (!canRead) {
        let url = getUrl(req.url)
        switch (url) {
            case 'customers':
            case 'projects':
            case 'calendar':
                next()
                break
            case 'teams':
                if (req.id !== undefined) {
                    unit.Teams.getOne(req.id, (status, team) => {
                        if (status !== 200) res.status(status).send('Not found')
                        let result = _.find(config.currentUser.scopes, ['team', team.name]);
                        if (result === undefined) {
                            res.status(404).send('NOT FOUND')
                        } else {
                            next()
                        }
                    })
                } else {
                    res.status(401).end()
                    return
                }
                break
            case 'people':
                next()
                break
            default:
                next()
                break
        }
    }
}

const canWrite = (req, res, next) => {
    if (config.currentUser.scopes[0].role !== 'admin') {
        let url = getUrl(req.url)
    }
    next()
}

export default { login, logout, signed, canRead, canWrite }