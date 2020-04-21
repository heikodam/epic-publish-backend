const mongoose = require("mongoose");

const ads = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        bedrooms: {
            type: Number,
            require: false
        }
    }
)

module.exports = ads;