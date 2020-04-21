const cote = require("cote");
const mongoose = require('mongoose');
const {MongoClient} = require('mongodb')


const encrypt = require("./crypt");
const MarketLogin = require('./marketLoginModel');
const Ads = require('./adModel.js');

const username = "heikodam";
const password = "mongodbPass";
const dbName = "multiPublish";
const collection = "ads";

const uri = `mongodb://${username}:${password}@cluster0-shard-00-00-zg4z1.mongodb.net:27017,cluster0-shard-00-01-zg4z1.mongodb.net:27017,cluster0-shard-00-02-zg4z1.mongodb.net:27017/${dbName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useUnifiedTopology: true });

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, (err) => {
    if(err){
        console.log("There was an error connecting to the db in adHandler", err)
    } else {
        console.log("Connected to db through adHandler")
    }
})





const adHandlerResponder = new cote.Responder({
    name: 'ad Handler Responder',
    namespace: 'adHandler'
});



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


adHandlerResponder.on('viewAds', async (req, cb) => {

    try {
        Ads.find({}).then((ads) => {
            console.log(ads)
            // ads.imgUpload = {}
            // ads.imgs = {}
            cb(null, "ads")
        })
    } catch {
        cb("You have no ads", null)
    }
    


    

});

adHandlerResponder.on('saveAd', async (req, cb) => {

    try {

        var newAd = {...req.formValues}
        // console.log(btoa(unescape(encodeURIComponent(req.imgs[0].data))))

        // var base64en = req.imgs[0].data.toString('base64')
        // var base64en = "empty"
        // console.log(base64en)
        newAd.imgs = req.imgs[0]
        newAd.date = new Date()
        newAd.userId = req.userId

        console.log(newAd)

        const adsDB = new Ads(newAd)
        await adsDB.save()


        cb(null, "Successfully saved")
    } catch (err) {
        console.log(err)
        cb("Something went wrong", null)

    }

    


});