import express from "express";
import { userLogin, userLogout, userRegister, getMyProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

// register
router.post("/register",userRegister)

// Login
router.post("/login",userLogin)
 
// logout
router.get("/logout",userLogout)

// myprofile
router.get("/myprofile",isAuthenticated,getMyProfile) 
export default router;