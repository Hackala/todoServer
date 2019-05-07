import Person from '../models/person.model'
import { People } from '../database/unitOfWork'
import formidable from 'formidable'
import ftp from 'ftp'
import config from '../config'

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
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (fields) {
            People.update(req.id, fields, (status, result) => {
                res.status(status).send(result)
            })
        }
        if (files.photo) {
            People.getOne(req.id, (status, result) => {
                if (status === 200) {
                    let client = new ftp()
                    client.on('ready', () => {
                        client.put(files.photo.path, result.image + '.jpg', (err) => {
                            client.end()
                        })
                    })
                    client.connect(config.ftpOptions)
                }
            })
        }
    })
}

const remove = (req, res) => { People.remove(req.id, (status, result) => { res.status(status).send(result) }) }

export default { create, list, getId, read, update, remove }