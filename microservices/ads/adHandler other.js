// const cote = require("cote");
// const mongoose = require('mongoose');
// const {MongoClient} = require('mongodb')


// const encrypt = require("./crypt");
// const addDataToAds = require("../../database/addDataToAds");
// // const viewAds = require("../../database/viewAds");
// const MarketLogin = require('./marketLoginModel');

// const username = "heikodam";
// const password = "mongodbPass";
// const dbName = "multiPublish";
// const collection = "ads";

// const uri = `mongodb://${username}:${password}@cluster0-shard-00-00-zg4z1.mongodb.net:27017,cluster0-shard-00-01-zg4z1.mongodb.net:27017,cluster0-shard-00-02-zg4z1.mongodb.net:27017/${dbName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;

// const client = new MongoClient(uri, { useUnifiedTopology: true });

// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// }, (err) => {
//     if(err){
//         console.log("There was an error connecting to the db in adHandler", err)
//     } else {
//         console.log("Connected to db through adHandler")
//     }
// })





// const adHandlerResponder = new cote.Responder({
//     name: 'ad Handler Responder',
//     namespace: 'adHandler'
// });



// adHandlerResponder.on('saveMarketLogin', async (req, cb) => {
//     try {
//         const marketLoginData = {
//             ...req.marketLogin,
//             password: encrypt(req.marketLogin.password).encryptedData,
//             userID: req.user._id
//         }

//         const marketLoginDB = new MarketLogin(marketLoginData)
//         await marketLoginDB.save()
//         // console.log("3")
//         cb(null, "Successfully saved")
//     } catch (error) {
//         console.log("In Catch of saveMarketLogin")
//         console.log("Error: ", error)
//         cb("Unable to save the data", null)
//     }
// });


// adHandlerResponder.on('viewAds', async (req, cb) => {

//     // CORRECT THE USER ID
//     // viewAds(req.userId).then((ads) => console.log(ads));
//     // console.log(ads)
//     const userId = req.userId;
//     try {
//         var ads = []
//         client.connect((err, db) => {
//             console.log("Connection Opend")
//             if (err) throw err;
//             var dbo = db.db(dbName);
//             dbo.collection(collection).find({userId: userId}).toArray(
//                 (err, result) => {
//                 if(err) throw err;
//                 db.close()
//                 // console.log(result)
//                 cb(null, "Some Text")
//                 ads = result
//                 console.log("CB finished Running")

//             }
//             )
//             // .then((result) => {            
//             //         // if(err) throw err;
//             //         db.close()
//             //         console.log(result)
//             //         ads = result
//             //         return cb(null, result)
//             //         // console.log("CB finished Running")
//             // }).catch((err) => cb(err, result));
//             // // console.log(a)
//             // console.log(ads)
//             // cb(null, ads)
//           })
//         //   .then(() => {
//         //     console.log("Now in then")
//         //     cb(null, "A Random Result")
//         //   }
//         //   );
//     } catch (error){
//         console.log("An error has occured in viewAds adHandler")
//         cb("Something Went wrong", null);
//     }
    

// });

// adHandlerResponder.on('saveAd', (req, cb) => {

//     // var newAd = {
//     //     title: req.adDataToSave.title,
//     //     description: req.adDataToSave.description,
//     //     bedrooms: req.adDataToSave.bedrooms
//     // }

//     // var newAd = JSON.stringify({...req.adDataToSave});
//     console.log("Req in adHandler: ", req)
//     var newAd = {...req.formValues}
//     newAd.imgs = req.imgs
//     newAd.date = new Date()
//     newAd.userId = req.userId
//     // console.log(req)
//     console.log("New Ad Data:")
//     console.log(newAd)
//     // console.log(req)
//     // UNCOMMENT THIS LINE TO SAVE THE AD
//     addDataToAds(newAd)
//     // for(var key in req.adDataToSave){

//     // }
//     // console.log("Req")
//     // console.log(req)
//     // console.log("newAd")
//     // console.log(req)
//     // var pAd = new Ad(newAd)

//     // pAd.save().then(() => {
//     //     console.log("Successfully saved")
//     // }).catch(err => {console.log(err)})

//     cb(null, "Successfull saved in the Backend")
// });