// Importing all the dependencies
import mongoose from "mongoose"
import { postSchema } from "./PostSchema/posts.schema.js"
import { postAndUser } from "./PostSchema/postAndUser.schema.js";
import { ObjectId } from 'mongoose';
import { commentSchema } from "../Comment/commentSchema/comment.schema.js";
import { likeSchema } from "../Like/like.schema.js/like.schema.js";


export default class postsRepository{
    constructor(){
        this.postModel = mongoose.model('Post', postSchema);
        this.postAndUserModel = mongoose.model('UserAndPost', postAndUser);
        this.commentModel = mongoose.model('comments', commentSchema);
        this.likeModel = mongoose.model('likes', likeSchema);
    }

    // Implementing a functionality to create Post by logged in User
    createPost = async (postDetails, userId)=>{
        try{
            const {caption, imageURL} = postDetails;
            const newPost = new this.postModel({
                caption,
                imageURL,
            });

            // Add post details in database
            const result = await newPost.save();
            const existingUser = await this.postAndUserModel.findOne({userId});
            if(existingUser){
                existingUser.postId.push(result._id);
                await existingUser.save();
            }
            else{
                const newUser = new this.postAndUserModel({
                    userId,
                    postId: [result._id],
                })
                await newUser.save();
            }

            result.userIDreference = userId;
            await result.save();
            return result;
        }catch(err){
            console.log(err);
        }
    }

    getAllPostsofId = async (userId)=>{
        try{
            const userData = await this.postAndUserModel.findOne({userId});
            console.log(userData.postId);
            if(!userData || !userData.postId){
                return "No Posts found";
            }
            console.log(userData);
            const userPosts = await this.postModel.find({_id:{$in:userData.postId}});
            console.log(userPosts);
            return userPosts
        }catch(err){
            console.log(err);
            return "Some error occured in Repository";
        }
    }

    deletePostById = async (postId, userId) => {
        try {
            console.log(postId, userId);
            let deleted = false;
    
            // Delete the post by its ID
            const deletedDocument = await this.postModel.findByIdAndDelete(postId);
    
            if (deletedDocument) {
                console.log("Document deleted:", deletedDocument);
                deleted = true;
    
                // Delete comments associated with the deleted post
                await this.commentModel.deleteMany({ postId: postId });
    
                // Delete likes associated with the deleted post
                await this.likeModel.deleteMany({ postId: postId });
            } else {
                console.log("Document not found or already deleted");
            }
    
            if (deleted) {
                // Update the user document to remove the post reference
                const updatedUser = await this.postAndUserModel.findOneAndUpdate(
                    { userId },
                    { $pull: { postId: postId } },
                    { new: true }
                );
    
                console.log("User document updated:", updatedUser);
            }
        } catch (err) {
            console.error(err);
            return "Some error occurred in repository";
        }
    };
    
    updatePost = async (updatePostDetails, postId) => {
        try {
          console.log("postId: ", postId);
          console.log("updatePostDetails: ", updatePostDetails);
      
          // Assuming that this.postModel is your Mongoose model for posts
          const updatedPost = await this.postModel.findByIdAndUpdate(
            postId,
            updatePostDetails,
            { new: true } // This option returns the updated document
          );
      
          if (updatedPost) {
            console.log("Updated post:", updatedPost);
            return updatedPost;
          } else {
            console.log("Post not found or update failed.");
            return "Post not found or update failed.";
          }
        } catch (err) {
          console.error(err);
          return "There is some error in repository";
        }
    };

    
    getPostById = async (postId) => {
        try {
            console.log("postId: ", postId);
  
            // // Convert the postId to a valid ObjectId
            // const objectId = new ObjectId(postId);
  
            const post = await this.postModel.findOne({ _id: postId });
            console.log(post);
            if (!post) {
                return "No post found";
            }
  
            return post;
        } catch (err) {
            console.log(err);
            return "Some error occurred in repository";
        }
    };
}