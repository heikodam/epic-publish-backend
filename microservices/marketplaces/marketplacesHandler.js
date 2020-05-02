const cote = require("cote");

const encrypt = require("./crypt");
const Marketplace = require('./marketplaceModel');

require("../../database/mongoose")



const marketplaceResponder = new cote.Responder({
    name: 'Marketplace Handler Responder',
    namespace: 'marketplaceHandler'
});

marketplaceResponder.on('createMarketplace', async (req, cb) => {
    try {
        const marketLoginData = {
            ...req.body,
            password: encrypt(req.body.password).encryptedData,
            userId: req.user._id
        }

        const marketLoginDB = new Marketplace(marketLoginData)
        await marketLoginDB.save()
        cb(null, "Successfully saved")

    } catch (error) {
        console.log("Error: ", error)
        cb("Something went wrong", null)
    }
});

marketplaceResponder.on('getMarketplaces', async (req, cb) => {

    try {
        const marketplaces = await Marketplace.find({userId: req.user._id.toString()})

        if(!marketplaces){
            cb("Bad Request", null)
        } else {
            cb(null, marketplaces)
        }

    } catch (error) {
        console.log(error)
        cb("You have no marketplaces", null)
    }
});

marketplaceResponder.on('deleteMarketplace',async (req,cb) => {
    try{
        await Marketplace.findOneAndDelete({_id: req.marketplaceId, userId: req.userId})
        cb(null, "Marketplace deleted")

    } catch (err) {
        cb(err, null)
    }
})

marketplaceResponder.on('deleteMarketplaces',async (req,cb) => {
    try{
        await Marketplace.deleteMany({userId: req.userId})
        cb(null, "Marketplaces deleted")

    } catch (err) {
        cb(err, null)
    }
})

marketplaceResponder.on('getMarketplace', async (req, cb) => {

    try {
        const marketplace = await Marketplace.findById(req.marketplaceId.toString())
        if(!marketplace){
            cb("Bad Request", null)
        } else {
            cb(null, marketplace)
        }
        

    } catch (error) {
        console.log(error)
        cb("You have no ads", null)
    }
});

// marketplaceResponder.on('updateAd', async (req,cb) => {
//     try {
//         const updates = Object.keys(req.body)
//         const notAllowedUpdates = ['userId', 'date', '_id']
//         const InvalidOperation = updates.every((update) => notAllowedUpdates.includes(update))

//         if(InvalidOperation){
//             cb("Invalid Updates", null)
//         } else {
//             // updates.forEach((update) => req.user[update] = req.body[update])
//             await Ads.updateOne({_id: req.adId}, req.body)
//             cb(null, req.user)

//         }

//     } catch (error) {
//         console.log("Error is thrown in delete", error);
//         cb("There was an Error", null)
//     }
// })






// marketplaceResponder.on('saveAd', async (req, cb) => {

//     try {

//         var newAd = {...req.formValues}
//         newAd.imgs = req.imgs
//         newAd.date = new Date()
//         newAd.userId = req.userId

//         const adsDB = new Ads(newAd)
//         await adsDB.save()


//         cb(null, "Successfully saved")
//     } catch (err) {
//         cb("Something went wrong", null)

//     }
// });
