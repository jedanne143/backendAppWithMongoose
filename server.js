const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000;
//for database connection
const connectToDb = require("./config/connectToDb");
connectToDb();

//=========Middlewares===========
app.use(express.json());
app.use(express.static("public"));
const logMiddleware = (req, res, next) => {
    console.log(`Request [method: ${req.method}] [URL: ${req.url}]`)
    next()
}
app.use(logMiddleware)
//==========ROUTES============

//Root directory
app.get('/', (req, res) => {
    res.send('This is the root directory')
})

//Importing routes into server.js
const cssRouter = require("./routes/cssRoute")
const htmlRouter = require("./routes/htmlRoute")
const jsRouter = require("./routes/jsRoute")
// Attaching and associating routers to specific url paths
app.use('/css' , cssRouter)
app.use('/html' , htmlRouter)
app.use('/js' , jsRouter)
//All other routes not defined on this app
app.get("*", (req, res) => {
    res.status(404).send("Path doesn't exist")
})
//Starting the server
app.listen(PORT , () =>{
    console.log(`Listening on PORT ${PORT}`)
})