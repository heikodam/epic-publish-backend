const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../microservices/identityHandler/userModel');

const uri = process.env.MONGODB_URL;


mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

const auth = async (req, res, next) => {
    try {
        // console.log("IN AUTH")
        // console.log(req.cookies.token);
        // const token = "123"
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Now here");
        const user = await User.findOne({ _id: decoded._id, 'token': token });
        // console.log('getting to the end');

        if (!user) {
        // console.log("IN IF")
        res.status(401).send('Please authenticate.');
        } else{
        // console.log("IN ELSE auth.js User: ", user)
        
        req.token = token
        req.user = user
        next()
        }

        
    } catch (e) {
        // console.log("IN Catch")
        res.status(401).send('Please authenticate.');
    }
}

module.exports = auth