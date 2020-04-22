const express = require("express");
const cote = require("cote");

const router = new express.Router()

const auth = require("../middelware/auth");


router.post('/createUser', (req, res) => {
    identityRequestor.send({type: 'createUser', user: req.body}, (error, user) => {
        if(error){
            res.status(400).send(error);
        } else{
            res.cookie("token", user.token);
            res.send(user);
        }
    });
    
})

router.post('/login', async (req, res) => {
    identityRequestor.send({type: 'login', user: req.body}, (error, user) => {
        if(error){
            res.status(400).send(error);
        } else {
            res.cookie("token", user.token);
            res.send(user);
        }
        
    })
});

router.post('/logout', async (req, res) => {
    identityRequestor.send({type: 'logout', token: req.cookies.token}, (error, user) => {
        res.clearCookie("token");
        res.send();        
    })
});

router.post('/emailUsed', async (req, res) => {
    identityRequestor.send({type: 'emailUsed', email: req.body.email}, (error, emailUsed) => {
        if(error){
            res.status(401).send()
        } else {
            res.send(emailUsed);        
        }
    })
})

const identityRequestor = new cote.Requester({
    name: 'identity requestor',
    namespace: 'identityHandler'
});

module.exports = router