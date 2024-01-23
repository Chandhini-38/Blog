const User = require('../Models/user');
const express = require('express');
const bcrypt = require('bcrypt');

const User_function = {

createUser : async(req,res) =>{
    try{        
    const {username,email,password} = req.body

    //validation
    if(!username || !email || !password){
        return res.status(400).json({message: "please enter all fields"})
    }
    //check if it is existing user
    const exist = await User.findOne({email})
    if(exist){
        return res.status(400).json({message: "user already exist"})
    }

    const hashedPassword = await bcrypt.hash(password,10 )//salt round 10

    //save user
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })
        await newUser.save()
        res.status(200).json(
            {message: "user created successfully",
            newUser}
        )
    }catch(error){
        console.log(error)
        res.status(500).json({message: "server error"})
    }
},

getAllUsers : async(req,res) =>{
    try{
        const users = await User.find()
        res.status(200).send({
            userCount : users.length,
            message:"user data",
            users
        })
    }catch(error){
        console.log(error)
        res.status(500).json({message: "server error"})
    }
},
login : async(req,res) =>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({message: "please enter all fields"})
        }
        //checking email already exist or not 
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "user does not exist"})
        }
        //pasword matching or not
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                message: "invalid credentials",
        })
        }
        res.status(200).send({
            message: "login successful",
            user
        })
    }catch(error){
        console.log(error)
        res.status(500).json({message: "server error"})
    } 
}
}



module.exports = User_function;
