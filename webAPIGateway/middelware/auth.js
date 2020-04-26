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
        console.log(req)
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'token': token });

        console.log("Id: ", decoded._id)
        console.log("User: ", user)

        if (!user) {
        res.status(401).send('Please authenticate.');
        } else{
            req.token = token
            req.user = user
            next()
        }

        
    } catch (e) {
        res.status(401).send('Please authenticate.');
    }
}

module.exports = auth