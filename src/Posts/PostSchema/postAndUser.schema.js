import mongoose from "mongoose";

export const postAndUser = mongoose.Schema({
    userId:{
        type:String,
        unique:true,
        required:true
    },

    postId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts',
        required:true
    }]
})