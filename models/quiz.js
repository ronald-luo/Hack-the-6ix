const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = Schema({
    videoid:{
        type:String, 
        required: true
    }, 
    questionids:{
        type:Array,
        required: true
    },
    upvotes:{
        type: Number, 
        required: true
    }
},{timestamps: true});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;