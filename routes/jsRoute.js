const express = require('express')
const router = express.Router()

//for importing data from models
const jsQ = require("../models/jsQuestion");

//Middlerware for JS routes
router.use((res,req,next) => {
    console.log("Accessing JS routes")
    next()
})

//[READ] all JS contents
router.get('/', async (req, res) => {
    try {
        // Find all documents in the js collection
        const jsQuestions = await jsQ.find(); 
        // Send the data as JSON in the response 
        res.json(jsQuestions);    
    } catch (error) {
        res.status(500).send('Error fetching data from js collection');
    }
})
//[READ] a HTML content by id
router.get("/:id", async (req, res) => {
    try{
        const jsId = req.params.id
        const jsQuestion = await jsQ.findById(jsId)
        // Send the data as JSON in the response 
        res.json({jsQuestion:jsQuestion});    
        } catch (error) {
            res.status(500).send('Error fetching data from css collection');
        }
  });
//[CREATE] a question
router.post('/', async (req,res) => {
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
router.put("/:id", async (req, res) => {
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
router.delete('/:id', async (req, res) => {
    const jsId = req.params.id
    await jsQ.deleteOne({
        _id : jsId
    })
    res.json({success: `${jsId} deleted`})
})
module.exports = router;
