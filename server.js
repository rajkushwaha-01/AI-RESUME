require('dotenv').config();
const dns = require('dns')
const app = require('./src/app')
const ConnectDB = require('./src/DB/db')
const generateInterviewReport = require('./src/services/ai.service')
const {resume , jobDescription, selfDescription} = require('./src/services/temp')


dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])


ConnectDB();
generateInterviewReport({resume, jobDescription, selfDescription});


app.listen(3000 , ()=>{
    console.log("port is runing on 3000")
})