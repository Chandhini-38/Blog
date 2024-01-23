const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true,'title is require']
    },
    description:{
        type:String,
        required:[true,'description is require']
    },
    image:{
        type:String,
        required:[false,'image is require']
    },
    //reation with user
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required: [true,'user is require']
    }
},{ timestamps :true })

const Blog = mongoose.model("Blog",blogSchema)

module.exports = Blog;