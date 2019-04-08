import mongoose from 'mongoose'
require('./engagement.model')

module.exports = mongoose.model('Team',
    new mongoose.Schema({
        name: { type: String, unique: true },
        description: String,
        engagement: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Engagement' }]
    })
)