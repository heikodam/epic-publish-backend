const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    rent: {
        type: Number,
        required: true
    },
    marketplaces: {
        type: Array
    },
    imgs: {
        type: Array
    }
}, { strict: false });

const ads = mongoose.model('ads', adSchema)

module.exports = ads