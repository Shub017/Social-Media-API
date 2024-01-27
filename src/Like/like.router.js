import express from 'express';
import likeController from './like.controller.js';
import { verifyAuthToken } from '../Middlewares/jsonWebToken.js';

const likeRouter = express();
const LikeController = new likeController();


likeRouter.put('/registerLike', verifyAuthToken, LikeController.registerLikeForPost);
likeRouter.delete('/toggleLike', verifyAuthToken, LikeController.toggleLike);
likeRouter.get('/getAllLikes', verifyAuthToken, LikeController.getAllLikesOfPost);
export default likeRouter;