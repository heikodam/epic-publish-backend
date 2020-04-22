const express = require("express");
const cote = require("cote");
const multer = require("multer");

require("../../database/mongoose")
const auth = require("../middelware/auth");
const Ads = require('../../microservices/ads/adModel');

const router = new express.Router()




router.get('/ads', auth, async (req, responds) => {
    try {
        Ads.find({userId: req.user._id}).then((ads) => {
            responds.send(ads);
        })
    } catch {
        responds.status(404).send(ads);
    }

})


const upload = multer();

router.post('/create-ad', auth, upload.single('imgUpload'), (req, responds) => {
    const formValues = JSON.parse(req.body.formValues)
    var imgs = []
    if(req.file) {
        imgs = [req.file.buffer]
    }
    adHandlerRequestor.send({type: 'saveAd', formValues: formValues, imgs: imgs, userId: req.user._id}, (err, res) => {
        responds.send("Successfully saved")
    });
})



router.post('/market-user-data', auth, async (req, responds) => {
    adHandlerRequestor.send({type: 'saveMarketLogin', marketLogin: req.body, user: req.user}, (err, res) => {
        if(err){
            responds.status(400).send("Something went wrong")
        } else{
            responds.send("Successfully the Login data saved")
        }
    });
});


router.post('/adPictures', upload.single('pictures'), async (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

const adHandlerRequestor = new cote.Requester({
    name: 'ad Handler requestor',
    namespace: 'adHandler'
});

module.exports = router