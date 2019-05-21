import mongoose from 'mongoose'
import _ from 'lodash'

class Repository {
    constructor(model) {
        this.collection = mongoose.model(model)
    }

    getAll({ select = '', include = [], filter = {}, sort = {}, page = 0 } = {}, callback) {
        let pages = 0, items = 0, pageSize = 5
        let coll = this.collection.find(filter).sort(sort)
        if (include !== '') {
            include.forEach((e) => {
                coll.populate(e.include, e.fields)
            })
        }
        this.collection.countDocuments((err, cnt) => {
            if (page) {
                items = cnt
                pages = Math.trunc(items / pageSize) + 1
                if (page > pages) page = pages
                coll.skip(pageSize * (page - 1)).limit(pageSize)
            }
            coll.exec((err, result) => {
                if (err) {
                    callback(400, err)
                } else {
                    callback(200, result, { page, items, pages })
                }
            })
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
