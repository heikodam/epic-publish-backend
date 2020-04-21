const {MongoClient} = require('mongodb')



 function addSignupData(data)  {
    const username = "heikodam"
    const password = "mongodbPass"
    const dbName = "multiPublish"
    const collection = "users"
    
    const uri = `mongodb://${username}:${password}@cluster0-shard-00-00-zg4z1.mongodb.net:27017,cluster0-shard-00-01-zg4z1.mongodb.net:27017,cluster0-shard-00-02-zg4z1.mongodb.net:27017/${dbName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`
    
    const client = new MongoClient(uri, { useUnifiedTopology: true });

  client.connect((err, db) => {
      console.log("Connection Opend")

    //   if (err) throw err;
      var dbo = db.db(dbName);
      dbo.collection(collection).insertOne(data, function(err, res) {
        console.log(data)
        // if (err) throw err;
        console.log("1 document inserted");
        db.close();
        console.log("Connection Closed")

      });
    });
}


module.exports = addSignupData;