const express = require("express");
const path = require("path")
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser'); 
const cors = require("cors");


const userRouter = require('./routers/user');
const adRouter = require('./routers/ad');
const marketplaceRouter = require('./routers/marketplace');

app.use(express.static(path.join(__dirname, 'client')));



app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(userRouter);
app.use(adRouter);
app.use(marketplaceRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'../client/index.html'));
});





module.exports = app