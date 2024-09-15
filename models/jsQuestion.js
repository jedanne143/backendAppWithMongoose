const mongoose = require('mongoose')

const jsSchema = new mongoose.Schema({
    question: { 
        type: String, 
        //validation with custom error message
        required: [true, 'Question is required!']
    },
    answer: { 
        type: String, 
        //validation with custom error message
        required: [true, 'Answer is required!'] 
    },
    option1: String,
    option2: String,
    option3: String,
    points: { 
        type: Number, 
        default: 1 
    }
})


const jsQ = mongoose.model("Js" , jsSchema)

module.exports = jsQ