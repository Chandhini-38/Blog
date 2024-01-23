const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true,'username is require']
    },
    email:{
        type:String,
        required:[true,'email is require']
    },
    password:{
        type:String,
        required:[true,'password is require']
    },
    //reation with blog
    blogs:{
        type:mongoose.Types.ObjectId,
        ref:"Blog"
    },

},{ timestamps: true })

const User = mongoose.model("User",userSchema)

module.exports = User;