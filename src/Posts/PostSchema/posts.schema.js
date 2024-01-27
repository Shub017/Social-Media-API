import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const postSchema = mongoose.Schema({
    caption:{
        type:String,
        required:true,
        trim:true,
    },
    
    imageURL:{
        type:String,
        required:true,
    },

    userIDreference:{
        type:String,
    }
})