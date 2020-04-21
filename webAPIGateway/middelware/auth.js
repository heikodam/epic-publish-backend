const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../microservices/identityHandler/userModel');

const username = "heikodam";
const password = "mongodbPass";
const dbName = "multiPublish";
const collection = "ads";

const uri = `mongodb://${username}:${password}@cluster0-shard-00-00-zg4z1.mongodb.net:27017,cluster0-shard-00-01-zg4z1.mongodb.net:27017,cluster0-shard-00-02-zg4z1.mongodb.net:27017/${dbName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;


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
        const decoded = jwt.verify(token, 'superdupersecretKey');
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