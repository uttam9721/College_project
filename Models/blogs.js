import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    title: {
      type: "String",
      required: true,
    },
    description: {
      type: "String",
      required: true,
    },
    imgUrl: {
      type: "String",
      required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        require:true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  export const Blog = mongoose.model("Blog", blogSchema);
  