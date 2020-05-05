const express = require("express");
const cote = require("cote");
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const streamifier = require("streamifier");

require("../../database/mongoose")
const auth = require("../middelware/auth");
const Ads = require('../../microservices/ads/adModel');

const router = new express.Router()




router.get('/ads/me', auth, async (req, responds) => {

    adHandlerRequestor.send({type: 'getAds', userId: req.userId}, (err, ads) => {
        if(err){
            responds.status(404).send("You don't have any ads yet")
        } else{
            responds.send(ads)
        }
    });

})

// Both needed to upload imgs to cloudinary
const upload = multer({
    limits: {
        fileSize: 5000000 
    }, 
    fileFilter(req, file, cb){
        // console.log("Request in upload", req)
        console.log("Request in upload")
        console.log(file.originalname)
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            console.log("Rejects this file")
            return cb(new Error("Please upload an image"))
        }
        cb(undefined, true)
    }
});
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
  


router.post('/ads', auth, upload.array('photos', 12), async (req, responds) => {
    
    // console.log(req)
    console.log("Request in Route")

    const formValues = JSON.parse(req.body.formValues)

    // Save Imgs to cloudary
    var savedImgs = []
    let imgRes = {}

    try {
        if(req.files){
            for(var x = 0; x < req.files.length; x++){
                imgRes = await streamUpload(req.files[x].buffer);
                savedImgs.push(imgRes)
            }    
        }
    } catch (error){
        console.log(error)
    }
    
    
    adHandlerRequestor.send({type: 'saveAd', formValues: formValues, imgs: savedImgs, userId: req.userId}, (err, res) => {
        if(err){
            responds.status(400).send()
        } else {            
            responds.status(201).send()
        }
    });
})



router.delete('/ads/me', auth, async (req, responds) => {
    adHandlerRequestor.send({type: 'deleteAds', userId: req.userId}, (err, res) => {
        if(err){
            responds.status(400).send()
        } else {
            responds.status(200).send()
        }
    })
})

router.delete('/ads/me/:id', auth, async (req, responds) => {
    adHandlerRequestor.send({type: 'deleteAd', adId: req.params.id, userId: req.userId}, (err, res) => {
        if(err){
            responds.status(400).send()
        } else {
            responds.status(200).send()
        }
    })
})

router.get('/ads/me/:id', auth, async (req, responds) => {
    adHandlerRequestor.send({type: 'getAd', userId: req.userId, adId: req.params.id}, (err, ad) => {
        if(err){
            responds.status(404).send()
        } else{
            responds.status(200).send(ad)
        }
    });
})

router.patch('/ads/me/:id', auth, async (req, responds) => {
    adHandlerRequestor.send({type: 'updateAd', userId: req.userId, adId: req.params.id, body: req.body}, (err, ad) => {
        if(err){
            responds.status(400).send()
        } else{
            responds.status(200).send(ad)
        }
    });
})


const adHandlerRequestor = new cote.Requester({
    name: 'ad Handler requestor',
    namespace: 'adHandler'
});

module.exports = router