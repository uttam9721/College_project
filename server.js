import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js"
import cookieParser from "cookie-parser";
import blogRouter from "./routes/blog.js";
import { config } from "dotenv";
import cors from 'cors'
const app = express();
const PORT=4000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:['GET','POST','PUT','DELETE'],
  credentials:true
}))

config({
  path: './data/config.env'
})

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// user routes
app.use('/api/user',userRouter)


// blogRouter
app.use('/api/blogs',blogRouter)

  
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
