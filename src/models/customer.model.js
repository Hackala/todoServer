import mongoose from 'mongoose'

module.exports = mongoose.model('Customer',
    new mongoose.Schema({
        name: String,
        image: String,
        contact: String,
        email: String,
        phone: String,
        address: {
            zipCode: String,
            city: String,
            road: String
        },
        status: String
    })
)
