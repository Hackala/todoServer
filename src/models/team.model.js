import mongoose from 'mongoose'

const Member = new mongoose.Schema({
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    role: String,
    hours: Number
})

module.exports = mongoose.model('Team',
    new mongoose.Schema({
        name: { type: String, unique: true },
        description: String,
        members: [Member]
    })
)
