const {MongoClient} = require('mongodb')


 const checkLogin = (data) => {
    return new Promise((resolve, reject) => {
    
        const username = "heikodam"
        const password = "mongodbPass"
        const dbName = "multiPublish"
        const collection = "users"
        
        const uri = `mongodb://${username}:${password}@cluster0-shard-00-00-zg4z1.mongodb.net:27017,cluster0-shard-00-01-zg4z1.mongodb.net:27017,cluster0-shard-00-02-zg4z1.mongodb.net:27017/${dbName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`
        
        const client = new MongoClient(uri, { useUnifiedTopology: true });

        client.connect((err, db) => {
            console.log("Login Connection Opend")
            if (err){
                console.log("Error, login.js, connect to MongoDB");
                return reject(err)
            }
            var dbo = db.db(dbName);
            dbo.collection(collection).findOne({username: data.username}, function(err, result){
                if(err){
                    console.log("Error Login.js, findOne Collection")
                    return reject(err)
                }
                console.log(result);
                db.close();
                if(result){
                    return resolve(result._id);
                } else {
                    return resolve();
                }
            });
        });
    });   
}


module.exports = checkLogin;