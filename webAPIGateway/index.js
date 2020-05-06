const app = require('./app')
const port = process.env.PORT || 4545


app.listen(port, () => {
    console.log(`Sever is up and Running on Port ${port}, Happy Experementing`)
})


