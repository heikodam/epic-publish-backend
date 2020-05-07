const jwt = require('jsonwebtoken');
const cote = require('cote')


const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        identityRequestor.send({type: 'getBlacklist'}, (err, resp) => {
            if(err){
                res.status(500).send()
            }
        
            validate(resp)
        })

        const validate = (blacklist) => {
            if(blacklist.indexOf(token) >= 0){
                res.status(401).send('Please authenticate.');
            }
            else{
                req.token = token
                req.userId = decoded._id
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

