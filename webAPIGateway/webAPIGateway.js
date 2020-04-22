const app = require("express")();
const bodyParser = require("body-parser");
const cote = require("cote");
const cookieParser = require('cookie-parser'); 
const cors = require("cors");
const multer = require("multer");

require("../database/mongoose")
const auth = require("./middelware/auth");
const Ads = require('../microservices/ads/adModel');


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
        Ads.find({userId: req.user._id}).then((ads) => {
            responds.send(ads);
        })
    } catch {
        responds.status(404).send(ads);
    }

})


const upload = multer();

app.post('/create-ad', auth, upload.single('imgUpload'), (req, responds) => {
    const formValues = JSON.parse(req.body.formValues)
    var imgs = []
    if(req.file) {
        imgs = [req.file.buffer]
    }
    adHandlerRequestor.send({type: 'saveAd', formValues: formValues, imgs: imgs, userId: req.user._id}, (err, res) => {
        responds.send("Successfully saved")
    });
})

app.post('/createUser', (req, res) => {
    identityRequestor.send({type: 'createUser', user: req.body}, (error, user) => {
        if(error){
            res.status(400).send(error);
        } else{
            res.cookie("token", user.token);
            res.send(user);
        }
    });
    
})

app.post('/login', async (req, res) => {
    identityRequestor.send({type: 'login', user: req.body}, (error, user) => {
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
        res.clearCookie("token");
        res.send();        
    })
});

app.post('/emailUsed', async (req, res) => {
    identityRequestor.send({type: 'emailUsed', email: req.body.email}, (error, emailUsed) => {
        if(error){
            res.status(401).send()
        } else {
            res.send(emailUsed);        
        }
    })
})

app.post('/market-user-data', auth, async (req, responds) => {
    adHandlerRequestor.send({type: 'saveMarketLogin', marketLogin: req.body, user: req.user}, (err, res) => {
        if(err){
            responds.status(400).send("Something went wrong")
        } else{
            responds.send("Successfully the Login data saved")
        }
    });
});


app.post('/adPictures', upload.single('pictures'), async (req, res) => {
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