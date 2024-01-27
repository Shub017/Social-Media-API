// Import all dependecies
import mongoose, { mongo } from "mongoose";

export const likeSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },

    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts',
        required:true
    }
})