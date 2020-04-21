const cote = require("cote");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('./userModel');

const identityResponder = new cote.Responder({
    name: 'identity Responder',
    namespace: 'identityHandler'
});

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



identityResponder.on('createUser', async (req, cb) => {
    try {
        const user = new User(req.user)
        await user.save()
        const token = await user.generateAuthToken()
        cb(null, {user, token})
    } catch (error) {
        cb("Unable to Sign You up", null)
    }
});


identityResponder.on('login', async (req, cb) => {
    console.log("Starting Login");

    // Check if User Exists
    const user = await User.findOne({ "email": req.user.email })
    console.log("Found User", user);
    if(!user){
        console.log("Unable 1");
        cb("Unable to Log in", null);
        return
    }

    // check if Right Password
    const isUser = await user.isUser(req.user.password);
    console.log("isUser: ", isUser);
    if(!isUser){
        console.log("Unable 2");
        cb("Unable to Log in", null);
        return
    }

    // Generate the User Token if entered Data is correct
    const token = await user.generateAuthToken()
    console.log({user, token});

    cb(null, {user, token})
});


identityResponder.on('logout', async (req, cb) => {
    try {

        const decoded = jwt.verify(req.token, 'superdupersecretKey');
        await User.findByIdAndUpdate(decoded._id, {token: undefined}, {new: true, runValidators: true});
        cb(null, "Logged out")

    } catch (error) {
        console.log("Error is thrown in Logout");
        cb("You are already logged out", null)
    }
});

identityResponder.on('emailUsed', async (req, cb) => {
    try {

        // const decoded = jwt.verify(req.token, 'superdupersecretKey');
        const user = await User.findOne({email: req.email});

        if(!user){
            cb(null, false)
        }

        cb(null, true)
        
    } catch (error) {
        console.log("Error is thrown in emailUsed");
        cb("There was an Error", null)
    }
});