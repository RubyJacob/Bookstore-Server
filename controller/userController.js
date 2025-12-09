const users= require('../models/userModel')
//jwtwebtoken
const jwt = require('jsonwebtoken')

//register api call 
exports.registerController = async(req,res)=>{
    console.log("Inside registerController");
    console.log(req.body);
    const {username,email,password} = req.body 
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(409).json("User Already exists !! Please Login")
        }
        else{
            const newUser = new users({
                username,
                email,
                password,
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }
    //res.status(200).json("Request Received")
}

//login api
exports.loginController = async(req,res)=>{
    console.log("Inside LoginController");
    console.log(req.body);
    const {email,password} = req.body 
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            if(password == existingUser.password){
                const token = jwt.sign({usermail:existingUser.email,role:existingUser.role},process.env.JWTSECRET)
                res.status(200).json({user:existingUser,token})
            }
            else{
                res.status(401).json("Incorrect Email/Password")
            }
        }
        else{
            res.status(400).json("Account Doesnot Exist !!")
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }
    //res.status(200).json("Request Received")
}

//google login
exports.googleLoginController = async(req,res)=>{
    console.log("Inside googleLoginController");
    console.log(req.body);
    const {email,password,username,picture} = req.body 
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
               //login
               const token = jwt.sign({usermail:existingUser.email,role:existingUser.role},process.env.JWTSECRET)
                res.status(200).json({user:existingUser,token})
            }
        else{
             //register
             const newUser = await users.create({
                 username,email,password,picture
             })
             const token = jwt.sign({usermail:newUser.email,role:newUser.role},process.env.JWTSECRET)
             res.status(200).json({user:newUser,token})
            }
        }
    catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }
    //res.status(200).json("Request Received")
}

