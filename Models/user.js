const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true,'username is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    //reation with blog
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],

},{ timestamps: true })

const User = mongoose.model("User",userSchema)

module.exports = User;