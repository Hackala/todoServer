import mongoose from 'mongoose'

module.exports = mongoose.model('Day',
    new mongoose.Schema({
        date: Date,
        type: String,
        hours: Number,
        person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
        tasks: [{
            project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
            description: String,
            hours: Number
        }]
    }) //, { collection: 'calendar'})
)
