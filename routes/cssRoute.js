const express = require("express")
const router = express.Router()

//for importing data from models
const cssQ = require('../models/cssQuestion')

//Middlerware for CSS routes
router.use((res,req,next) => {
    console.log("Accessing CSS routes")
    next()
})

//[READ] all CSS contents 
router.get('/', async (req, res) => {
    try {
        // Find all documents in the css collection
        const cssQuestions = await cssQ.find(); 
        // Send the data as JSON in the response 
        res.json(cssQuestions);    
    } catch (error) {
        res.status(500).send('Error fetching data from css collection');
    }
})
//[READ] a CSS content by id
router.get("/:id", async (req, res) => {
    try{
        const cssId = req.params.id
        const cssQuestion = await cssQ.findById(cssId)
        // Send the data as JSON in the response 
        res.json({cssQuestion:cssQuestion});    
        } catch (error) {
            res.status(500).send('Error fetching data from css collection');
        }
  });
//[CREATE] a question
router.post('/', async (req,res) => {
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
router.put("/:id", async (req, res) => {
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
router.delete('/:id', async (req, res) => {
    const cssId = req.params.id
    await cssQ.deleteOne({
        _id : cssId
    })
    res.json({success: `${cssId} deleted`})
})

module.exports = router