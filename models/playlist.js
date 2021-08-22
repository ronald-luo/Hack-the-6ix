const mongoose = require("mongoose")
const schema = mongoose.Schema

const playlistSchema = new mongoose.Schema({
    title:{
        type:String, 
        required: true
    },
    channel:{
        type:String, 
        required: true
    },
    thumbnail:{
        type:String,
        required: true
    },
    playlistid:{
        type:String,
        required: true
    },
    videoids:{
        type:Array,
        required: true
    }
}, {timestamps: true})

const Playlist = mongoose.model("Playlist", playlistSchema)
module.exports = Playlist