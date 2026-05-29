require('dotenv').config();
const dns = require('dns')
const app = require('./src/app')
const ConnectDB = require('./src/DB/db')


dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])


ConnectDB();


app.listen(3000 , ()=>{
    console.log("port is runing on 3000")
})