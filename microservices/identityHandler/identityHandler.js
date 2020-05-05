const cote = require("cote");
const jwt = require('jsonwebtoken');
const NodeCache = require("node-cache");
const blacklistCache = new NodeCache();
blacklistCache.set("blacklist", [])


require("../../database/mongoose")
const User = require('./userModel');



const identityResponder = new cote.Responder({
    name: 'identity Responder',
    namespace: 'identityHandler'
});


identityResponder.on('createUser', async (req, cb) => {
    try {
        const user = new User(req.user)
        user.date = new Date()
        await user.save()
        const token = await user.generateAuthToken()
        cb(null, {user: {_id: user._id, firstname: user.firstname, surname: user.surname, email: user.email}, token})
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

    cb(null, {user: {_id: user._id, firstname: user.firstname, surname: user.surname, email: user.email, date: user.date}, token})
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

identityResponder.on('logout', async (req, cb) => {
    try {
        
        var blacklist = blacklistCache.get("blacklist")
        blacklist.push(req.token)
        blacklistCache.set("blacklist", blacklist)

        cb(null, "Logged out")

        var index;
        for(index = 0; index < blacklist.length; index++){
            const {exp} = jwt.decode(blacklist[index])
            var current_time = new Date() / 1000

            if(current_time <= exp){
                break;
            }
        }
        blacklistCache.set("blacklist", blacklist.slice(index))

    } catch (error) {
        console.log("Error is thrown in Logout", error);
        cb("You are already logged out", null)
    }
});

identityResponder.on('delete', async (req, cb) => {
    try {
        // const decoded = jwt.verify(req.token, process.env.JWT_SECRET);
        const user = await User.findByIdAndDelete(req.userId)

        if(!user){cb("Not Found", null)}
        else {cb(null, "Deleted")}

    } catch (error) {
        console.log("Error is thrown in delete", error);
        cb("There was an Error", null)
    }
});

identityResponder.on('updateProfile', async (req, cb) => {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['firstname', 'surname', 'email', 'password']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if(!isValidOperation){
            cb("Invalid Updates", null)
        } else {
            const user = {}
            updates.forEach((update) => user[update] = req.body[update])
            await User.updateOne({_id: req.userId}, user)
            cb(null, user)

        }

    } catch (error) {
        console.log("Error is thrown in Patch Profile", error);
        cb("There was an Error", null)
    }
});

identityResponder.on('getProfile', async (req, cb) => {
    try {

        const user = await User.findById(req.userId)
        const userSlim = {
            firstname: user.firstname,
            surname: user.surname,
            email: user.email,
            date: user.date
        }
        cb(null, userSlim)

    } catch (error) {
        console.log("Error is thrown in delete", error);
        cb("There was an Error", null)
    }
});


identityResponder.on('getBlacklist', async (req, cb) => {
    const blacklist = blacklistCache.get("blacklist")
    console.log("Blacklist in identity: ", blacklist)
    cb(null, blacklist)
})