import mongoose from "mongoose";
import { commentSchema } from "./commentSchema/comment.schema.js";

export default class commentRepository{
    constructor(){
        this.commentModel = mongoose.model('comment', commentSchema);
    }

    addComment = async (postId, userId, comment)=>{
        try{
            
            const newComment = this.commentModel({
                comment,
                postId,
                userId
            })

            return await newComment.save();

        }catch(err){
            console.log(err);
            return "Some error Occured in repository";
        }
    }

    updateComment = async (commentId, updateCommentDetails, userId) => {
        try {
            
            const updateComment = await this.commentModel.findOneAndUpdate(
            { _id: commentId, userId: userId }, 
            { $set: { comment: updateCommentDetails } }, 
            { new: true } 
        );
            console.log(updateComment);
            return updateComment;
        } catch (err) {
            console.error(err); 
        }   
    };

    deleteComment = async (commentId, userId) => {
        try {
            console.log("commentId", commentId);
    
            // Use findByIdAndDelete to delete the comment by its ID
            const deletedComment = await this.commentModel.findByIdAndDelete({
                _id:commentId,
                userId:userId
            });
    
            if (!deletedComment) {
                return "Comment not found or already deleted";
            }
    
            return deletedComment;
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    getComment = async (commentId)=>{
        try{
            const deletedDocument = this.commentModel.findOneAndDelete(commentId);
            console.log(deletedDocument);
            if(!deletedDocument){
                return "Comment not found or already deleted!"
            }

            return deletedDocument;
        }catch(err){
            console.log(err);
            throw err;
        }
    }

}