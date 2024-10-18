import { User } from "../Models/users.js";
import jwt from 'jsonwebtoken'
export const isAuthenticated =async(req,res,next)=>{
    const {token} = req.cookies
    console.log(token)

    if(!token) return res.status(401).json({
        success:false,
        message:"Please Login First",
    })

    const decode = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decode._id)
    res.json({
        success:true,
        user:req.user
    })
    next();
}