//to access connection string from env file
require('dotenv').config()
const mongoose = require("mongoose")

const connectToDb = async () => {
    try{
    await mongoose.connect(process.env.DB_URI)
    console.log('Connected to DB')
    } catch (error) {
        console.log('Error connecting to DB', error)
    }
}

module.exports = connectToDb