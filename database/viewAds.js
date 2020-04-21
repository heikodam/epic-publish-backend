const {MongoClient} = require('mongodb')

const username = "heikodam"
const password = "mongodbPass"
const dbName = "multiPublish"
const collection = "ads"

const uri = `mongodb://${username}:${password}@cluster0-shard-00-00-zg4z1.mongodb.net:27017,cluster0-shard-00-01-zg4z1.mongodb.net:27017,cluster0-shard-00-02-zg4z1.mongodb.net:27017/${dbName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`

const client = new MongoClient(uri, { useUnifiedTopology: true });

 function viewAds(userId)  {
  client.connect((err, db) => {
      console.log("Connection Opend")
      if (err) throw err;
      var dbo = db.db(dbName);
      dbo.collection(collection).find({userId: userId}).toArray((err, result) => {
          if(err) throw err;
          db.close()
        //   console.log(result)
          return result
      });
    });
}


module.exports = viewAds;