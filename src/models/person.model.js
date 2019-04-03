import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Engagement = new mongoose.Schema({
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    role: String,
    hours: Number
})

module.exports = mongoose.model('Person',
    new mongoose.Schema({
        firstName: String,
        lastName: String,
        gender: Number,
        image: String,
        email: String,
        phone: String,
        position: String,
        birthday: Date,
        beginDate: Date,
        endDate: Date,
        status: String,
        engagement: [Engagement]
    })
)
