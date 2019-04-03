import { Calendar } from '../database/unitOfWork'

const create = (req, res) => { Calendar.insert(req.body, (status, result) => { res.status(status).send(result) }) }

const list = (req, res) => {
    Calendar.getAll((status, result) => {
        res.status(status).send(result)
    }
    // , [{ include: 'team', fields: '_id name' }, { include: 'customer', fields: '_id name' }]
    )
}

const getId = (req, res, next, id) => { req.id = id; next() }

const read = (req, res) => { 
    Calendar.getOne(req.id, (status, result) => { 
        res.status(status).send(result) 
    }
    // , [{ include: 'team', fields: '_id name' }, { include: 'customer', fields: '_id name' }]
    )
}

const update = (req, res) => { Calendar.update(req.id, req.body, (status, result) => { res.status(status).send(result) }) }

const remove = (req, res) => { Calendar.remove(req.id, (status, result) => { res.status(status).send(result) }) }

export default { create, list, getId, read, update, remove }