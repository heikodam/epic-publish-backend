const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    imgs: {
        type: Buffer
    }
}, { strict: false });

const ads = mongoose.model('ads', adSchema)

module.exports = ads