const mongoose = require('mongoose');

const marketLoginSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        trim: true
    },
    marketplace: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        require: true
    }
});


const MarketLogin = mongoose.model('marketLogin', marketLoginSchema)

module.exports = MarketLogin