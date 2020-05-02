const express = require("express");
const cote = require("cote");

require("../../database/mongoose")
const auth = require("../middelware/auth");
const MarketPlace = require('../../microservices/marketplaces/marketplaceModel');

const router = new express.Router()


router.post('/marketplaces', auth, async (req, responds) => {
    marketplaceRequestor.send({type: 'createMarketplace', body: req.body, user: req.user}, (err, marketplace) => {
        if(err){
            responds.status(400).send()
        } else{
            responds.status(201).send(marketplace)
        }
    });
});

router.get('/marketplaces/me', auth, async (req, responds) => {

    marketplaceRequestor.send({type: 'getMarketplaces', user: req.user}, (err, marketplaces) => {
        if(err){
            responds.status(404).send()
        } else{
            responds.status(200).send(marketplaces)
        }
    });

})



// router.post('/marketplaces', async (req, responds) => {
    
//     marketplaceRequestor.send({type: 'saveAd', formValues: formValues, imgs: savedImgs, userId: req.user._id}, (err, res) => {
//         if(err){
//             responds.status(400).send()
//         } else {            
//             responds.status(201).send()
//         }
//     });
// })



// router.delete('/marketplaces/me', auth, async (req, responds) => {
//     marketplaceRequestor.send({type: 'deleteAds', userId: req.user._id}, (err, res) => {
//         if(err){
//             responds.status(400).send()
//         } else {
//             responds.status(200).send()
//         }
//     })
// })

// router.delete('/marketplaces/me/:id', auth, async (req, responds) => {
//     marketplaceRequestor.send({type: 'deleteAd', adId: req.params.id, userId: req.user._id}, (err, res) => {
//         if(err){
//             responds.status(400).send()
//         } else {
//             responds.status(200).send()
//         }
//     })
// })

// router.get('/marketplaces/me/:id', auth, async (req, responds) => {
//     marketplaceRequestor.send({type: 'getAd', user: req.user, adId: req.params.id}, (err, ad) => {
//         if(err){
//             responds.status(404).send()
//         } else{
//             responds.status(200).send(ad)
//         }
//     });
// })

// router.patch('/marketplaces/me/:id', auth, async (req, responds) => {
//     marketplaceRequestor.send({type: 'updateAd', user: req.user, adId: req.params.id, body: req.body}, (err, ad) => {
//         if(err){
//             responds.status(400).send()
//         } else{
//             responds.status(200).send(ad)
//         }
//     });
// })


const marketplaceRequestor = new cote.Requester({
    name: 'Marketplace Handler requestor',
    namespace: 'marketplaceHandler'
});

module.exports = router