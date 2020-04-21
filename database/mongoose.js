const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, (err) => {
    if(err){
        console.log("Faild to connect to DB", err)
    } else {
        console.log("Connected to DB")
    }
})