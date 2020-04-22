const app = require('./app')
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Sever is up and Running on Port ${port}, Happy Experementing`)
})