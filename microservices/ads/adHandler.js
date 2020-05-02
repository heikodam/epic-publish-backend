const cote = require("cote");

const encrypt = require("./crypt");
const MarketLogin = require('./marketLoginModel');

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



adHandlerResponder.on('saveMarketLogin', async (req, cb) => {
    try {
        const marketLoginData = {
            ...req.marketLogin,
            password: encrypt(req.marketLogin.password).encryptedData,
            userID: req.user._id
        }

        const marketLoginDB = new MarketLogin(marketLoginData)
        await marketLoginDB.save()
        cb(null, "Successfully saved")

    } catch (error) {
        console.log("Error: ", error)
        cb("Something went wrong", null)
    }
});


adHandlerResponder.on('getAds', async (req, cb) => {

    try {

        const ads = await Ads.find({userId: req.user._id.toString()})

        cb(null, ads)

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

