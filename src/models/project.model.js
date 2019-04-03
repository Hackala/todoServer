import mongoose from 'mongoose'

module.exports = mongoose.model('Project',
    new mongoose.Schema({
        name: String,
        description: String,
        startDate: Date,
        endDate: Date,
        status: String,
        team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
        customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }
    })
)
