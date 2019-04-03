import { Teams } from '../database/unitOfWork'

const create = (req, res) => { Teams.insert(req.body, (status, result) => { res.status(status).send(result) }) }

const list = (req, res) => {
    Teams.getAll((status, result) => {
        res.status(status).send(result)
    },
        [{ include: 'members.person', fields: '_id firstName lastName' }]
    )
}

const getId = (req, res, next, id) => { req.id = id; next() }

const read = (req, res) => {
    Teams.getOne(req.id, (status, result) => {
        res.status(status).send(result)
    },
        [{ include: 'members.person', fields: '_id firstName lastName' }]
    )
}

const update = (req, res) => { Teams.update(req.id, req.body, (status, result) => { res.status(status).send(result) }) }

const remove = (req, res) => { Teams.remove(req.id, (status, result) => { res.status(status).send(result) }) }

export default { create, list, getId, read, update, remove }