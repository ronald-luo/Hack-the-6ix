var mongoose = require("mongoose");
var schema = mongoose.Schema

const questionSchema = new mongoose.Schema({
    q:{
        type:String,
        required: true
    },
    ans:{
        type:String,
        required: true
    },
    choices:{
        type:Array, 
        required: true
    },
    quiz:{
        type:String, 
        required: true
    }

}, {timestamps:true})

const Question = mongoose.model("Question", questionSchema)
module.exports = Question