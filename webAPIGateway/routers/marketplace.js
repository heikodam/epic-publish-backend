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
            responds.status(201).send()
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

router.delete('/marketplaces/me/:id', auth, async (req, responds) => {
    marketplaceRequestor.send({type: 'deleteMarketplace', marketplaceId: req.params.id, userId: req.user._id}, (err, res) => {
        if(err){
            responds.status(400).send()
        } else {
            responds.status(200).send()
        }
    })
})

router.delete('/marketplaces/me', auth, async (req, responds) => {
    marketplaceRequestor.send({type: 'deleteMarketplaces', userId: req.user._id}, (err, res) => {
        if(err){
            responds.status(400).send()
        } else {
            responds.status(200).send()
        }
    })
})

router.get('/marketplaces/me/:id', auth, async (req, responds) => {
    marketplaceRequestor.send({type: 'getMarketplace', user: req.user, marketplaceId: req.params.id}, (err, marketplace) => {
        if(err){
            responds.status(404).send()
        } else{
            responds.status(200).send(marketplace)
        }
    });
})

router.patch('/marketplace/me/:id', auth, async (req, responds) => {
    marketplaceRequestor.send({type: 'updateMarketplace', user: req.user, marketplaceId: req.params.id, body: req.body}, (err, marketplace) => {
        if(err){
            responds.status(400).send()
        } else{
            responds.status(200).send(marketplace)
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












const marketplaceRequestor = new cote.Requester({
    name: 'Marketplace Handler requestor',
    namespace: 'marketplaceHandler'
});

module.exports = router