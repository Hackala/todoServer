import _ from 'lodash'
import config from '../config'
import unit from '../database/unitOfWork'

let result = false

const foundAny = (array, strings) => {
    const roles = strings.split(',')
    array.forEach((s) => {
        if (_.includes(roles, s.role)) {
            result = true
        }
    })
    return result
}

const getUrl = (url) => {
    if (url.substring(0, 5) !== '/api/') return ''
    url = url.substring(5)
    let i = url.indexOf('/')
    if (i > 0) url = url.substring(0, i)
    return url
}

const canRead = (url, id, callback) => {
    switch (url) {
        case 'customers':
        case 'projects':
        case 'calendar':
        case 'people':
            callback(true)
            break
        case 'teams':
            if (id !== undefined) {
                unit.Teams.getOne(id, (status, team) => {
                    if (status !== 200) return false
                    let teamR = _.find(config.currentUser.scopes, ['team', team.name]);
                    result = teamR !== undefined
                    callback(result)
                })
            }
            break
        default:
            callback(true)
            break
    }
}

const canWrite = (url, id) => {
    switch (url) {
        case 'customers':
        case 'projects':
        case 'calendar':
        case 'people':
            return true
            break
        case 'teams':
            if (id !== undefined) {
                unit.Teams.getOne(id, (status, team) => {
                    if (status !== 200) return false
                    let result = _.find(config.currentUser.scopes, ['team', team.name]);
                    return result !== undefined
                })
            }
            break
        default:
            return true
            break
    }
}

export default { getUrl, foundAny, canRead, canWrite }