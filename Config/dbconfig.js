const mongoose = require('mongoose')

const dbconfig = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB connection successfully')
    }catch(err){
        console.log(err)
        console.log('Mongo connection error')
    }
}

module.exports = dbconfig