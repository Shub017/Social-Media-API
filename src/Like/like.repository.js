import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js/like.schema.js";

export default class likeRepository{
    constructor(){
        this.likeModel = mongoose.model('like', likeSchema);
    }

    registerLike = async (userId, postId) => {
        try {
            const alreadyExist = await this.likeModel.findOne({ postId: postId, userId: userId });
    
            console.log(alreadyExist);
    
            if (alreadyExist) {
                return "Already Liked!";
            }
    
            const newLike = new this.likeModel({
                userId,
                postId
            });
    
            await newLike.save();
            return newLike;
    
        } catch (err) {
            console.log(err);
        }
    }
    
    toggleLike = async (userId, postId) => {
        try {
            const deletedLike = await this.likeModel.findOneAndDelete({
                userId: userId,
                postId: postId
            });
    
            if (!deletedLike) {
                return "Like not found";
            }
    
            return deletedLike;
    
        } catch (err) {
            console.log(err);
            return "Some error occurred in Like repository";
        }
    }
    
    getAllLikesOnPost = async (postId) => {
        try {
            const likes = await this.likeModel.find({ postId: postId });
            return likes;
        } catch (err) {
            console.log(err);
            return "Some error occurred in Like repository";
        }
    }
    
}