import express from 'express';
import commentController from './comment.controller.js';
import { verifyAuthToken } from '../Middlewares/jsonWebToken.js';

const commentRouter = express();
const CommentController = new commentController();

// Specified routes to handle different requests
commentRouter.post('/addComment', verifyAuthToken, CommentController.addNewComment);
commentRouter.put('/updateComment', verifyAuthToken, CommentController.updateCommentById);
commentRouter.get('/getComment', verifyAuthToken, CommentController.getCommentById);
commentRouter.delete('/deleteComment', verifyAuthToken, CommentController.deleteCommentById);

export default commentRouter;
