import express from 'express';
import userController from './user.controller.js';
import { basicAuth } from '../Middlewares/basicAuth.js';
import { verifyAuthToken } from '../Middlewares/jsonWebToken.js';
const userRouter = express();

// Making instance of User Controller
const UserController = new userController();

userRouter.put('/UserRegistration', UserController.registerUser);
userRouter.post('/UserLogIn', basicAuth, UserController.userLogIn);
userRouter.put('/profileUpdates', verifyAuthToken, UserController.updateUserProfile);
export default userRouter;