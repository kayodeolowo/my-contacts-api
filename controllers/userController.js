const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../models/userModel")


// /register a user

const registerUser = asyncHandler(async (req, res)=>{
    const {username, email, password } = req.body;
    if( !username || !email || !password ){
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const userAvailable = await User.findOne({email});
    if (userAvailable){
        res.status(400);
        throw new Error("user already registered")
    }

    
    res.json({ message: "Register the user"})

});



//login user
const loginUser = asyncHandler(async (req, res)=>{
    res.json({ message: "Login the user"})

});


//logged in  user
const currentUser =  asyncHandler(async  (req, res)=>{
    res.json({ message: "current user"})

});


module.exports = {registerUser, loginUser, currentUser}