import { People } from '../database/unitOfWork'

const create = (req, res) => { People.insert(req.body, (status, result) => { res.status(status).send(result) }) }

const list = (req, res) => {
    People.getAll((status, result) => {
        res.status(status).send(result)
    },
        [{ include: 'engagement.team', fields: 'name' }]
    )
}

const getId = (req, res, next, id) => { req.id = id; next() }

const read = (req, res) => {
    People.getOne(req.id, (status, result) => {
        res.status(status).send(result)
    },
        [{ include: 'engagement.team', fields: 'name' }]
    )
}

const update = (req, res) => {
    People.update(req.id, req.body, (status, result) => {
        res.status(status).send(result)
    })
}

const remove = (req, res) => { People.remove(req.id, (status, result) => { res.status(status).send(result) }) }

export default { create, list, getId, read, update, remove }