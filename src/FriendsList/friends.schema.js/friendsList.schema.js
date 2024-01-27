import mongoose from "mongoose";

export const friendsListSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },

    friendList:[{
        type:String,
    }]
})