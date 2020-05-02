const mongoose = require('mongoose');

const marketplaceSchema = new mongoose.Schema({
    userId: {
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


const Marketplace = mongoose.model('marketplaces', marketplaceSchema)

module.exports = Marketplace