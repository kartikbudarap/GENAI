const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

/**
 * @function registerController
 * @description Register a new user
 */
const registerController = async(req,res)=>{
    try{
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"Account already exists with this email address"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await userModel.create({
            username:username,
            email:email,
            password:hashedPassword
        })

        const token = jwt.sign({id:newUser._id,username:newUser.username},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie("token",token)

        res.status(201).json({
            success:true,
            message:"User registered successfully",
            user:{
                userId:newUser._id,
                username:newUser.username,
                email:newUser.email,
            }
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error in registerController",
            err:err.message
        })
    }
}

const loginController = async(req,res)=>{
    try{
        const {email,password} = req.body; 
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid credentials, user not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                success:false,
                message:"Invalid credentials, password is incorrect"
            })
        }

        const token = jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie("token",token);

        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            user:{
                userId:user._id,
                username:user.username,
                email:user.email,
            }
        });

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error in loginController",
            err:err.message
        })
    }
}

const logoutController = async(req,res)=>{
    try{
        const { token } = req.cookies;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "No token found"
            });
        }

        await tokenBlacklistModel.create({ token });

        res.clearCookie("token");

        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error in logoutController",
            err:err.message
        })
    }
}

module.exports = {registerController,loginController,logoutController}