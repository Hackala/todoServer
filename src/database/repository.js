import mongoose from 'mongoose'
import _ from 'lodash'

class Repository {
    constructor(model) {
        this.collection = mongoose.model(model)
    }

    getAll(callback, params = '') {
        let prom = this.collection.find()
        if (params !== '') {
            params.forEach((e) => {
                prom.populate(e.include, e.fields)
            })
        }
        prom.exec((err, result) => {
            if (err) {
                callback(400, err)
            } else {
                callback(200, result)
            }
        })
    }

    getOne(id, callback, params = '') {
        let prom = this.collection.findById(id)
        if (params !== '') {
            params.forEach((e) => {
                prom.populate(e.include, e.fields)
            })
        }
        prom.exec((err, result) => {
            if (err) {
                callback(400, err)
            } else {
                callback(200, result)
            }
        })
    }

    insert(data, callback) {
        let obj = new this.collection(data)
        obj.save(data, (err, result) => {
            if (err) {
                callback(400, err)
            } else {
                callback(200, result)
            }
        })
    }

    update = (id, data, callback) => {
        this.getOne(id, (status, obj) => {
            if (status !== 200) {
                callback(404, 'Requested data not found')
            } else {
                obj = _.extend(obj, data)
                obj.save((err, result) => {
                    if (err) {
                        callback(400, err)
                    } else {
                        callback(200, result)
                    }
                })
            }
        })
    }

    remove = (id, callback) => {
        this.getOne(id, (status, obj) => {
            if (status !== 200) callback(404, 'Requested data not found')
            obj.remove((err, result) => {
                if (err) {
                    callback(400, err)
                } else {
                    callback(200, result)
                }
            })
        })
    }
}

module.exports = Repository
