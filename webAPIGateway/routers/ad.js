const express = require("express");
const cote = require("cote");
const multer = require("multer");
// const cloudinary = require('cloudinary').v2;
// const streamifier = require("streamifier");
const {streamUpload} = require("./streamUpload");
const NodeCache = require("node-cache");

const auth = require("../middelware/auth");

const router = new express.Router()
const adsCache = new NodeCache();

const checkAdsCache = async (req, res, next) => {

    try{
        const ads = adsCache.get(req.userId)
        if(ads){
            res.send(ads)
        } else {
            next()
        }
    } catch (error){
        console.log(error)
        res.status(500).send()
    }
}



router.get('/ads/me', auth, checkAdsCache, async (req, responds) => {

    adHandlerRequestor.send({type: 'getAds', userId: req.userId}, (err, ads) => {
        if(err){
            responds.status(404).send("You don't have any ads yet")
        } else{
            adsCache.set(req.userId, ads, 7200)
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
        // console.log("Request in upload")
        // console.log(file.originalname)
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            console.log("Rejects this file: ", file.originalname)
            return cb(new Error("Please upload an image"))
        }
        cb(undefined, true)
    }
});
// // Function from cloudinary support https://support.cloudinary.com/hc/en-us/community/posts/360007581379-Correct-way-of-uploading-from-buffer-
// let streamUpload = (buffer) => {
//     return new Promise((resolve, reject) => {
//       let stream = cloudinary.uploader.upload_stream(
//         {
//             folder: "adPhotos"
//         },
//         (error, result) => {
//           if (result) {
//             resolve(result);
//           } else {
//             reject(error);
//           }
//         }
//       );
//       streamifier.createReadStream(buffer).pipe(stream);
//     });
//   };
  


router.post('/ads', auth, upload.array('photos', 12), async (req, responds) => {
    
    adsCache.del(req.userId)
    // console.log(req)
    const formValues = JSON.parse(req.body.formValues)
    

    // Save Imgs to cloudary
    var savedImgs = []
    let imgRes = {}

    try {
        if(req.files){
            for(var x = 0; x < req.files.length; x++){
                console.log("Now in For loop")
                imgRes = await streamUpload(req.files[x].buffer);
                console.log("after upload img in for loop")
                savedImgs.push(imgRes)
            }    
        }
    } catch (error){
        console.log("Catch in Upload files: >>>>>>>>>>>>>>>>>>>>>>>", error)
    }
    console.log("savedImgs", savedImgs);
    
    adHandlerRequestor.send({type: 'saveAd', formValues: formValues, imgs: savedImgs, userId: req.userId}, (err, ad) => {
        if(err){
            responds.status(400).send()
        } else {            
            responds.status(201).send(ad)
        }
    });
})



router.delete('/ads/me', auth, async (req, responds) => {
    adsCache.del(req.userId)
    adHandlerRequestor.send({type: 'deleteAds', userId: req.userId}, (err, res) => {
        if(err){
            responds.status(400).send()
        } else {
            responds.status(200).send()
        }
    })
})

router.delete('/ads/me/:id', auth, async (req, responds) => {
    adsCache.del(req.userId)
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
    adsCache.del(req.userId)
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