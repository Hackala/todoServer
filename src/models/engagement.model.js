import mongoose from 'mongoose'

module.exports = mongoose.model('Engagement',
    new mongoose.Schema({
        team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
        person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
        role: String,
        hours: Number
    })
)
