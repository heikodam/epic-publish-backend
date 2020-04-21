const cote = require("cote");
const mongoose = require('mongoose');

const encrypt = require("./crypt");

const username = "heikodam";
const password = "mongodbPass";
const dbName = "multiPublish";

const uri = `mongodb://${username}:${password}@cluster0-shard-00-00-zg4z1.mongodb.net:27017,cluster0-shard-00-01-zg4z1.mongodb.net:27017,cluster0-shard-00-02-zg4z1.mongodb.net:27017/${dbName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;

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


const publishHandlerResponder = new cote.Responder({
    name: 'publish Handler Responder',
    namespace: 'publishHandler'
});



adHandlerResponder.on('publishAd', async (req, cb) => {
    try {
        
    } catch (error) {
        
    }
});

