const express = require("express");
const cote = require("cote");
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const streamifier = require("streamifier");

require("../../database/mongoose")
const auth = require("../middelware/auth");
const Ads = require('../../microservices/ads/adModel');

const router = new express.Router()




router.get('/ads', auth, async (req, responds) => {
    try {
        Ads.find({userId: req.user._id}).then((ads) => {
            responds.status(200).send(ads);
        })
    } catch {
        responds.status(404).send();
    }

})

// Both needed to upload imgs to cloudinary
const upload = multer();
// Function from cloudinary support https://support.cloudinary.com/hc/en-us/community/posts/360007581379-Correct-way-of-uploading-from-buffer-
let streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        {
            folder: "adPhotos"
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });
  };
  


router.post('/create-ad', auth, upload.array('photos', 12), async (req, responds) => {
    const formValues = JSON.parse(req.body.formValues)

    var savedImgs = []
    let imgRes = {}

    for(var x = 0; x < req.files.length; x++){
        imgRes = await streamUpload(req.files[x].buffer);
        savedImgs.push(imgRes)
    }

    
    // var imgs = []
    // if(req.file) {
    //     imgs = [req.file.buffer]
    // }
    console.log("Saved Imgs: ", savedImgs)
    adHandlerRequestor.send({type: 'saveAd', formValues: formValues, imgs: savedImgs, userId: req.user._id}, (err, res) => {
        if(err){
            responds.status(400).send()
        } else {            
            responds.status(201).send("Successfully saved")
        }
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



router.delete('/ad/:id', auth, async (req, responds) => {
    adHandlerRequestor.send({type: 'deleteAd', adId: req.params.id, userId: req.user._id}, (err, res) => {
        if(err){
            responds.status(400).send("Something went wrong")
        } else {
            responds.status(200).send("Ad Deleted")
        }
    })
})



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