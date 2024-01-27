// Importing dependencies
import express from 'express';
import postController from './posts.controller.js';
import { verifyAuthToken } from '../Middlewares/jsonWebToken.js';

const postRouter = express();
const PostController = new postController();

// Creating paths for requests
postRouter.put('/createPost', verifyAuthToken, PostController.createNewPost);
postRouter.get('/getAllposts', verifyAuthToken, PostController.getAllPostsById);
postRouter.delete('/deletepost', verifyAuthToken, PostController.deletePostById);
postRouter.put('/updatepost', verifyAuthToken, PostController.updatePostByID);
postRouter.get('/getpostbyid', verifyAuthToken, PostController.getPostById);
export default postRouter;