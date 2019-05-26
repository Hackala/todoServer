import { Calendar } from '../database/unitOfWork'

const create = (req, res) => { Calendar.insert(req.body, (status, result) => { res.status(status).send(result) }) }

const list = (req, res) => {
    Calendar.getAll({}, (status, result) => {
        res.status(status).send(result)
    })
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

const month = (req, res) => {
    let d0 = new Date(req.year, req.month - 1, 1)
    let d1 = new Date(req.year, req.month, 1)
    let selOptions = {
        include: [{ include: 'team', fields: 'name' }, { include: 'customer', fields: 'name' }],
        filter: { 'person': req.person, 'date': { $gte: d0, $lt: d1 } },
        sort: { date: 1 }
    }
    Calendar.getAll(selOptions, (status, result) => {
        res.status(status).send(result)
    })
}

export default { create, list, getId, read, update, remove, month }