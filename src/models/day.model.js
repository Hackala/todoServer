import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Task = new mongoose.Schema({
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    description: String,
    hours: Number
})

module.exports = mongoose.model('Day',
    new mongoose.Schema({
        date: Date,
        type: String,
        hours: Number,
        person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
        tasks: [Task]
    })
)
