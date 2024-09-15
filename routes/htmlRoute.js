const express = require('express')
const router = express.Router()

//for importing data from models
const htmlQ = require('../models/htmlQuestion')

//Middlerware for HTML routes
router.use((res,req,next) => {
    console.log("Accessing HTML routes")
    next()
})

//[READ] all HTML contents
router.get('/', async (req, res) => {
    try {
        // Find all documents in the html collection
        const htmlQuestions = await htmlQ.find(); 
        // Send the data as JSON in the response 
        res.json(htmlQuestions);    
    } catch (error) {
        res.status(500).send('Error fetching data from html collection');
    }
})
//[READ] a HTML content by id
router.get("/:id", async (req, res) => {
    try{
        const htmlId = req.params.id
        const htmlQuestion = await htmlQ.findById(htmlId)
        // Send the data as JSON in the response 
        res.json({htmlQuestion:htmlQuestion});    
        } catch (error) {
            res.status(500).send('Error fetching data from css collection');
        }
  });
//[CREATE] a question
router.post('/', async (req,res) => {
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
router.put("/:id", async (req, res) => {
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
router.delete('/:id', async (req, res) => {
    const htmlId = req.params.id
    await htmlQ.deleteOne({
        _id : htmlId
    })
    res.json({success: `${htmlId} deleted`})
})

module.exports = router

