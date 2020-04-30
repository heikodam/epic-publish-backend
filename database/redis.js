// const redis = require("redis")  
// const client = redis.createClient()

// client.on('connect', function() {
//     console.log('connected');
// });










// // ES6 +
// const {execFile} = require("child_process")
// // import { execFile } from 'child_process';// to start the redis database in development 
// /*// for windows user import {execFile} from 'child_process';        
// // for ES5 users
// const redis = require('redis')*/
// // if in development mode use Redis file attached
// // start redis as a child process
// // if (process.env.NODE_ENV === 'development') {
// // const puts = (error, stdout) =>{
// // console.log(error)
// // console.log(stdout)
// // }
// // exec('redis/src/redis-server redis/redis.conf', puts);  
// // }
// // for window implementation 
// execFile('redis/redis-server.exe',(error,stdout)=>{
//     if(error){
//         throw error
//     }
//     console.log(stdout)
// })

// const redisClient = redis.createClient();
// // process.env.REDIS_URL is the redis url config variable name on heroku. 
// // if local use redis.createClient()
// redisClient.on('connect', ()=>{
//     console.log('Redis client connected')
//     });
//     redisClient.on('error', (error)=>{
//     console.log('Redis not connected', error)
//     });

// module.export  = redisClient