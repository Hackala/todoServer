import mongoose from 'mongoose'
import _ from 'lodash'
import config from '../config'

class Repository {
    constructor(model) {
        this.collection = mongoose.model(model)
    }

    getAll(callback) {
        let coll = this.collection();
        coll.exec((err, result) => {
            if (err) {
                callback(400, err)
            } else {
                callback(200, result)
            }
        })
    }

    getOne(id, callback) {
        let prom = this.collection.findById(id)
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

export default Repository
