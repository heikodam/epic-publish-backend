const app = require('./app')
const port = process.env.PORT

console.log("This is the port: ", port);

app.listen(port, () => {
    console.log(`Sever is up and Running on Port ${port}, Happy Experementing`)
})