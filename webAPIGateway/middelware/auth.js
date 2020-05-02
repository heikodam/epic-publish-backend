const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../microservices/identityHandler/userModel');
const { blacklist } = require("../../microservices/identityHandler/identityHandler");
const uri = process.env.MONGODB_URL;
const cote = require('cote')


mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

const auth = async (req, res, next) => {
    try {
        // console.log("Blacklist", blacklist)
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id});



        // console.log("Id: ", decoded._id)
        // console.log("Token: ", token)

        var blacklist = []

        identityRequestor.send({type: 'getBlacklist'}, (err, resp) => {
            if(err){
                res.status(500).send()
            }
            // console.log("resp in auth: ", resp)
            if(resp[0] === "wrong"){
                identityRequestor.send({type: 'getBlacklist'}, (err, respond) => {
                    // console.log("respond in auth: ", respond)
                    validate(respond)
                })
            } else {
                validate(resp)
            }
            
            blacklist.push(res)
            
    
        })

        // console.log("Blacklist in auth: ", blacklist)
        const validate = (blacklist) => {
            // console.log("In Validate")
            if (!user) {
                // console.log("No User found")
                res.status(401).send('Please authenticate.');
            } 
            else if(blacklist.indexOf(token) >= 0){
                // console.log("Token was blacklisted")
                res.status(401).send('Please authenticate.');
            }
            else{
                req.token = token
                req.user = user
                next()
            }
        }
            
        
    } catch (err) {
        console.log(err)
        res.status(401).send('Please authenticate.');
    }
}


const identityRequestor = new cote.Requester({
    name: "identity requestor",
    namespace: "identityHandler"
})


module.exports = auth

