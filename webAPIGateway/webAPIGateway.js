const app = require("express")();
const bodyParser = require("body-parser");
const cote = require("cote");
const cookieParser = require('cookie-parser'); 
const cors = require("cors");
const multer = require("multer");


const auth = require("./middelware/auth");




const mongoose = require('mongoose');
const {MongoClient} = require('mongodb')
const Ads = require('../microservices/ads/adModel');

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




app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.get('/', (req, res) => {
    res.send("Main Endpoint")
})

app.get('/ads', auth, async (req, responds) => {

    try {
        Ads.find({}).then((ads) => {
            // console.log(ads)
            // ads[0].imgUpload = {}
            // ads[0].imgs = {}
            responds.send(ads);
        })
    } catch {
        responds.status(404).send(ads);
    }

})


// Upload IMG
// const upload = multer({
//     // dest: "images",
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//             return cb(new Error('Please upload an image'))
//         }

//         cb(undefined, true)
//     }
// })

const upload = multer();


// I got it working but it is not working anymore
app.post('/create-ad', auth, upload.single('imgUpload'), (req, responds) => {
    // console.log(req.file.buffer)
    // console.log("Body: ", JSON.parse(req.body.formValues))
    const formValues = JSON.parse(req.body.formValues)
    var imgs = []
    if(req.file) {
        imgs = [req.file.buffer]
    }
    // console.log("User in webAPI create-ad: ", req.user)
    adHandlerRequestor.send({type: 'saveAd', formValues: formValues, imgs: imgs, userId: req.user._id}, (err, res) => {
        responds.send("Successfully saved")
    });
    // responds.send("Successfully saved")
})

app.post('/createUser', (req, res) => {
    console.log("Signup Starting");
    console.log(req.body)
    identityRequestor.send({type: 'createUser', user: req.body}, (error, user) => {
        console.log("User");
        if(error){
            res.status(400).send(error);
        } else{
            res.cookie("token", user.token);
            res.send(user);
        }
    });
    
})

app.post('/login', async (req, res) => {
    console.log(req.body);
    identityRequestor.send({type: 'login', user: req.body}, (error, user) => {
        console.log("webAPI, cb", error, user)
        if(error){
            res.status(400).send(error);
        } else {
            res.cookie("token", user.token);
            res.send(user);
        }
        
    })
});

app.post('/logout', async (req, res) => {
    identityRequestor.send({type: 'logout', token: req.cookies.token}, (error, user) => {
        console.log("webAPI, cb", error, user)
        res.clearCookie("token");
        res.send();        
    })
});

app.post('/emailUsed', async (req, res) => {
    console.log(req.body)
    identityRequestor.send({type: 'emailUsed', email: req.body.email}, (error, emailUsed) => {
        // console.log("webAPI, cb", error, user)
        // res.clearCookie("token");
        if(error){
            res.status(401).send()
        } else {
            res.send(emailUsed);        
        }
    })
})

app.post('/market-user-data', auth, async (req, responds) => {
    // console.log(req.user);
    adHandlerRequestor.send({type: 'saveMarketLogin', marketLogin: req.body, user: req.user}, (err, res) => {
        if(err){
            responds.status(400).send("Something went wrong")
        } else{
            responds.send("Successfully the Login data saved")
        }
    });
});

// Upload Images
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//             return cb(new Error('Please upload an image'))
//         }

//         cb(undefined, true)
//     }
// })

app.post('/adPictures', upload.single('pictures'), async (req, res) => {
    // const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    // req.user.picture = buffer
    // await req.user.save()
    // console.log(req)
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})




const adHandlerRequestor = new cote.Requester({
    name: 'ad Handler requestor',
    namespace: 'adHandler'
});

const identityRequestor = new cote.Requester({
    name: 'identity requestor',
    namespace: 'identityHandler'
});

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Sever is up and Running on Port ${port}, Happy Experementing`)
})