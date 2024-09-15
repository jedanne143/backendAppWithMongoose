const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000;
//for database connection
const connectToDb = require("./config/connectToDb");
connectToDb();
//for importing data from models
const cssQ = require('./models/cssQuestion')
const htmlQ = require('./models/htmlQuestion')
const jsQ = require("./models/jsQuestion");

//Middlewares
app.use(express.json());
app.use(express.static("public"));
const logMiddleware = (req, res, next) => {
    console.log(`Request [method: ${req.method}] [URL: ${req.url}]`)
    next()
}
app.use(logMiddleware)
//ROUTES

//[READ]
app.get('/', (req, res) => {
    res.send('This is the root directory')
})
//[READ all CSS contents]
app.get('/css', async (req, res) => {
    try {
        // Find all documents in the css collection
        const cssQuestions = await cssQ.find(); 
        // Send the data as JSON in the response 
        res.json(cssQuestions);    
    } catch (error) {
        res.status(500).send('Error fetching data from css collection');
    }
})
//[CREATE] a question
app.post('/css', async (req,res) => {
    try{
        const {question, answer, option1, option2, option3, points} = req.body
        const cssQuestion = await cssQ.create({
            question : question,
            answer : answer,
            option1: option1,
            option2: option2,
            option3 : option3,
            points: points
        })
        console.log("Successfully added a CSS question")
        res.json({cssQuestion : cssQuestion})
    } catch (err) {
        //for handling Mongoose validation errors
        res.status(400).json({ error: err.message });
    }
})
//[UPDATE]
app.put("/css/:id", async (req, res) => {
    try{
        const cssId = req.params.id
        const {question,answer,option1, option2, option3, points}= req.body
        const css =await cssQ.findByIdAndUpdate(cssId,{
            question : question,
            answer : answer,
            option1: option1,
            option2: option2,
            option3 : option3,
            points: points
        })
    const updatedCSS = await cssQ.findById(cssId)
    res.json({cssQuestion: updatedCSS})
    } catch (err){
        //for handling Mongoose validation errors
        res.status(400).json({ error: err.message });
    }
  });
//[DELETE]
app.delete('/css/:id', async (req, res) => {
    const cssId = req.params.id
    await cssQ.deleteOne({
        _id : cssId
    })
    res.json({success: `${cssId} deleted`})
})
app.listen(PORT , () =>{
    console.log(`Listening on PORT ${PORT}`)
})

//[READ all HTML contents]
app.get('/html', async (req, res) => {
    try {
        // Find all documents in the html collection
        const htmlQuestions = await htmlQ.find(); 
        // Send the data as JSON in the response 
        res.json(htmlQuestions);    
    } catch (error) {
        res.status(500).send('Error fetching data from html collection');
    }
})
//[CREATE] a question
app.post('/html', async (req,res) => {
    try{
        const {question, answer, option1, option2, option3, points} = req.body
        const htmlQuestion = await htmlQ.create({
            question : question,
            answer : answer,
            option1: option1,
            option2: option2,
            option3 : option3,
            points: points
        })
        console.log("Successfully added a HTML question")
        res.json({htmlQuestion : htmlQuestion})
    } catch (err){
        //for handling Mongoose validation errors
        res.status(400).json({ error: err.message }); 
    }
})
//[UPDATE]
app.put("/html/:id", async (req, res) => {
    try{
        const htmlId = req.params.id
        const {question,answer,option1, option2, option3, points}= req.body
        const html =await htmlQ.findByIdAndUpdate(htmlId,{
            question : question,
            answer : answer,
            option1: option1,
            option2: option2,
            option3 : option3,
            points: points
        })
        const updatedHTML = await htmlQ.findById(htmlId)
        res.json({htmlQuestion: updatedHTML})
    } catch (err) {
        //for handling Mongoose validation errors
        res.status(400).json({ error: err.message });
    }
  });
//[DELETE]
app.delete('/html/:id', async (req, res) => {
    const htmlId = req.params.id
    await htmlQ.deleteOne({
        _id : htmlId
    })
    res.json({success: `${htmlId} deleted`})
})

//[READ all JS contents]
app.get('/js', async (req, res) => {
    try {
        // Find all documents in the js collection
        const jsQuestions = await jsQ.find(); 
        // Send the data as JSON in the response 
        res.json(jsQuestions);    
    } catch (error) {
        res.status(500).send('Error fetching data from js collection');
    }
})
//[CREATE] a question
app.post('/js', async (req,res) => {
    try{
        const {question, answer, option1, option2, option3, points} = req.body
        const jsQuestion = await jsQ.create({
            question : question,
            answer : answer,
            option1: option1,
            option2: option2,
            option3 : option3,
            points: points
        })
        console.log("Successfully added a JS question")
        res.json({jsQuestion : jsQuestion})
    } catch (err) {
        //for handling Mongoose validation errors
        res.status(400).json({ error: err.message });
    }
})
//[UPDATE]
app.put("/js/:id", async (req, res) => {
    try{
        const jsId = req.params.id
        const {question,answer,option1, option2, option3, points}= req.body
        const js =await jsQ.findByIdAndUpdate(jsId,{
            question : question,
            answer : answer,
            option1: option1,
            option2: option2,
            option3 : option3,
            points: points
        })
    const updatedJS = await jsQ.findById(jsId)
    res.json({jsQuestion: updatedJS})
    } catch (err){
        //for handling Mongoose validation errors
        res.status(400).json({ error: err.message });
    }
  });
//[DELETE]
app.delete('/js/:id', async (req, res) => {
    const jsId = req.params.id
    await jsQ.deleteOne({
        _id : jsId
    })
    res.json({success: `${jsId} deleted`})
})
app.listen(PORT , () =>{
    console.log(`Listening on PORT ${PORT}`)
})