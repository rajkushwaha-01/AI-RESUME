const mongoose = require('mongoose')


async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB is connected");
    } catch (error) {
        clg(error)
    }
}


module.exports = ConnectDB;