import mongoose from "mongoose";

// Make a comment Model
export const commentSchema = mongoose.Schema({
    // Users comment
    comment:{
        type:String,
        requird:true,
        trim:true
    },

    // postId of the post on which comment is made
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        required:true
    },

    // UserId of the user who is making a comment
    userId:{
        type:String,
        required:true
    }
})