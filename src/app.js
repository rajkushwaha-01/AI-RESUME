const express  = require('express')
const cookieParser = require('cookie-parser')
const cores = require('cors')

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cores({
    origin: 'http://localhost:5173',
    credentials: true
}));
const authRouter = require('./routes/auth.route');

app.use('/api/auth' , authRouter)


module.exports = app; 