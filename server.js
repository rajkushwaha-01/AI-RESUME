require('dotenv').config();
const dns = require('dns')
const app = require('./src/app')
const ConnectDB = require('./src/DB/db')
const invokeGeminiAi = require('./src/services/ai.service')


dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])


ConnectDB();
invokeGeminiAi();


app.listen(3000 , ()=>{
    console.log("port is runing on 3000")
})