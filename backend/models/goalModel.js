const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    company: {
        type: String,
        required: [true, 'please add a text value']
    },
    logo: {
        type: ImageData,
        required: [true, 'please add a text value']
    },
    email: {
        type: String,
        required: [true, 'please add a text value']
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)