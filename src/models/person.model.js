import mongoose from 'mongoose'

module.exports = mongoose.model('Person',
    new mongoose.Schema({
        firstName: String,
        lastName: String,
        gender: String,
        image: String,
        position: String,
        status: String,
        email: String,
        phone: String,
        birthday: Date,
        beginDate: Date,
        endDate: Date,
        engagement: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Engagement' }]
    })
)
