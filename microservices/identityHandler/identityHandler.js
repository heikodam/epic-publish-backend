const cote = require("cote");
const jwt = require('jsonwebtoken');

require("../../database/mongoose")
const User = require('./userModel');



const identityResponder = new cote.Responder({
    name: 'identity Responder',
    namespace: 'identityHandler'
});


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

    // Check if User Exists
    const user = await User.findOne({ "email": req.user.email })
    if(!user){
        cb("Unable to Log in", null);
        return
    }

    // check if Right Password
    const isUser = await user.isUser(req.user.password);
    if(!isUser){
        cb("Unable to Log in", null);
        return
    }

    // Generate the User Token if entered Data is correct
    const token = await user.generateAuthToken()

    cb(null, {user, token})
});


identityResponder.on('logout', async (req, cb) => {
    try {

        const decoded = jwt.verify(req.token, process.env.JWT_SECRET);
        await User.findByIdAndUpdate(decoded._id, {token: undefined}, {new: true, runValidators: true});
        cb(null, "Logged out")

    } catch (error) {
        console.log("Error is thrown in Logout", error);
        cb("You are already logged out", null)
    }
});

identityResponder.on('emailUsed', async (req, cb) => {
    try {

        const user = await User.findOne({email: req.email});

        if(!user){
            cb(null, false)
        }

        cb(null, true)
        
    } catch (error) {
        console.log("Error is thrown in emailUsed", error);
        cb("There was an Error", null)
    }
});