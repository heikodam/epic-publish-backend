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
        }
});


const MarketLogin = mongoose.model('marketLogin', marketLoginSchema)

module.exports = MarketLogin