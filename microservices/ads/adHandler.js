const cote = require("cote");

// const encrypt = require("./crypt");
// const MarketLogin = require('./marketLoginModel');

require("../../database/mongoose")
const Ads = require('./adModel.js');



const adHandlerResponder = new cote.Responder({
    name: 'ad Handler Responder',
    namespace: 'adHandler'
});


adHandlerResponder.on('deleteAd',async (req,cb) => {
    try{
        await Ads.findOneAndDelete({_id: req.adId, userId: req.userId})
        cb(null, "Ad deleted")

    } catch (err) {
        cb(err, null)
    }
})

adHandlerResponder.on('deleteAds',async (req,cb) => {
    try{
        await Ads.deleteMany({userId: req.userId})
        cb(null, "Ad deleted")

    } catch (err) {
        cb(err, null)
    }
})

adHandlerResponder.on('updateAd', async (req,cb) => {
    try {
        const updates = Object.keys(req.body)
        const notAllowedUpdates = ['userId', 'date', '_id']
        const InvalidOperation = updates.every((update) => notAllowedUpdates.includes(update))

        if(InvalidOperation){
            cb("Invalid Updates", null)
        } else {
            // updates.forEach((update) => req.user[update] = req.body[update])
            const ad = await Ads.updateOne({_id: req.adId, userId: req.userId}, req.body)
            cb(null, ad)

        }

    } catch (error) {
        console.log("Error is thrown in delete", error);
        cb("There was an Error", null)
    }
})



// adHandlerResponder.on('saveMarketLogin', async (req, cb) => {
//     try {
//         const marketLoginData = {
//             ...req.marketLogin,
//             password: encrypt(req.marketLogin.password).encryptedData,
//             userID: req.user._id
//         }

//         const marketLoginDB = new MarketLogin(marketLoginData)
//         await marketLoginDB.save()
//         cb(null, "Successfully saved")

//     } catch (error) {
//         console.log("Error: ", error)
//         cb("Something went wrong", null)
//     }
// });


adHandlerResponder.on('getAds', async (req, cb) => {

    try {
        const ads = await Ads.find({userId: req.userId})

        if(!ads){
            cb("Bad Request", null)
        } else {
            cb(null, ads)
        }

    } catch (error) {
        console.log(error)
        cb("You have no ads", null)
    }
});

adHandlerResponder.on('getAd', async (req, cb) => {

    try {
        const ad = await Ads.findOne({_id: req.adId, userId: req.userId})
        if(!ad){
            cb("Bad Request", null)
        } else {
            delete ad.__v
            delete userId
            cb(null, ad)
        }
        

    } catch (error) {
        console.log(error)
        cb("You have no ads", null)
    }
});

adHandlerResponder.on('saveAd', async (req, cb) => {

    try {

        var newAd = {...req.formValues}
        newAd.imgs = req.imgs
        newAd.date = new Date()
        newAd.userId = req.userId

        const adsDB = new Ads(newAd)
        await adsDB.save()


        cb(null, "Successfully saved")
    } catch (err) {
        cb("Something went wrong", null)

    }
});

