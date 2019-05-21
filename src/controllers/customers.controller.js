import { Customers } from '../database/unitOfWork'

const create = (req, res) => { Customers.insert(req.body, (status, result) => { res.status(status).send(result) }) }

const list = (req, res) => {
    Customers.getAll({}, (status, result) => { res.status(status).send(result) }) 
}

const getId = (req, res, next, id) => { req.id = id; next() }

const read = (req, res) => { Customers.getOne(req.id, (status, result) => { res.status(status).send(result) }) }

const update = (req, res) => { Customers.update(req.id, req.body, (status, result) => { res.status(status).send(result) }) }

const remove = (req, res) => { Customers.remove(req.id, (status, result) => { res.status(status).send(result) }) }

export default { create, list, getId, read, update, remove }