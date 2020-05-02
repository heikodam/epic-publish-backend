const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    date: {
        type: Date,
        required: true
    },
    token:  {
            type: String,
        }
});

// FUNCTION NOT WORKING
userSchema.statics.findByCredentials = async (email, password) => {
    console.log("Middleware is Running now now, This should never run");
    return {name: "Middaleware Success"}
    // const user = await User.findOne({ email })

    // if (!user) {
    //     throw new Error('Unable to login')
    // }

    // const isMatch = await bcrypt.compare(password, user.password)

    // if (!isMatch) {
    //     throw new Error('Unable to login')
    // }

    // return user
}

userSchema.methods.isUser = async function(password) {

    const user = this;
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return false
    }

    return true
}

userSchema.methods.generateAuthToken = async function () {

    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {expiresIn: '12h'})

    // user.set('token', token);
    // await user.save()
    return token
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
});

const User = mongoose.model('User', userSchema)

module.exports = User