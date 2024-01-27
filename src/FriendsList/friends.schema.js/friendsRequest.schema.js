import mongoose from "mongoose";

export const friendRequestSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
        trim:true,
        unqiue:true
    },

    pendingRequests:[{
        type:String,
    }]
})