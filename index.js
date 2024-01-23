const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const dbconfig = require('./Config/Dbconfig')
const User = require('./Models/user');
const morgan = require('morgan') 


const index = express()

//env config 
dotenv.config()

//db config
dbconfig()


const userRoute = require('./routes/userRoute')
const blogRoute = require('./routes/Blogroute')

index.use(express.json());
index.use(morgan("dev"));
index.use(cors());

index.use('/api/user',userRoute);
index.use('/api/blog',blogRoute)

const port = process.env.PORT || 5000


index.listen(port,() =>{
    console.log(`Server is running on port ${port}`)
})