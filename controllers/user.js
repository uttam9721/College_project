import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { User } from "../Models/users.js";


// userRegister

export const  userRegister = async (req, res) => {

    const { name, email, password } = req.body;
  
    let user = await User.findOne({ email });
    if (user) 
      return res
        .status(400)
        .json({ 
          success: false, 
          message: "Email already exists" 
      })
      const hashPassword = await bcrypt.hash(password,10)
      user = await User.create({
          name,
          email,
          password:hashPassword
      })
      const token = jwt.sign({_id:user._id},'uttam@9721')
  
  // console.log(token)
      res.status(201).cookie("token",token,{
          httpOnly:true,
          maxAge:10*60*1000 //expire time
      }).json({ 
          success: true, 
          message: "User Register successfully" ,
      })
  };

// userLoigin

export const userLogin = async (req, res) => {

    const {email, password } = req.body;
  
    let user = await User.findOne({ email });

    if(!user) return res.status(400).json({
        success:false,
        message:"User not exists",
    })

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch) return res.status(400).json({
        success:false,
        message:"Invalid email or password",
    })

    const token = jwt.sign({_id:user._id},'uttam@9721')
  
  // console.log(token)
      res.status(201).cookie("token",token,{
          httpOnly:true,
          maxAge:10*60*1000 //expire time
      }).json({ 
          success: true, 
          message: `Welcome ${user.name}` ,
      })
  };

// userLogout

export const userLogout =(req,res)=>{
    res.status(200).cookie("token","",{
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User Logout successfully",
    })
}

// getMyProfile    // found token use for profile
export const getMyProfile =(req,res)=>{
    res.json({
        success:true,
        message:"Profile found",
    })
}