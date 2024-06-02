const mongoose = require('mongoose')

const connectDB = async () => {
    console.log('Connecting to MongoDB...'); 
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/app')

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


module.exports = connectDB