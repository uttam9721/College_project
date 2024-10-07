import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js"
import cookieParser from "cookie-parser";
const app = express();
const port = 4000;
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(
    "mongodb+srv://um8794907:uttam262903@collegeproject.eik8n.mongodb.net/Blog_app"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// home routes
app.use('/api/user',userRouter)

  
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
