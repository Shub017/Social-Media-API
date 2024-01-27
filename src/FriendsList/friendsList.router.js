import express from 'express';
import friendsListController from './friendsList.controller.js';
import { verifyAuthToken } from '../Middlewares/jsonWebToken.js';

const friendListRouter = express();
const FriendsListController = new friendsListController();

friendListRouter.put('/friendRequest', verifyAuthToken, FriendsListController.sendFriendRequest);
friendListRouter.put('/acceptFriendRequest', verifyAuthToken, FriendsListController.acceptingFriendRequest);
friendListRouter.get('/getfriendList', verifyAuthToken, FriendsListController.getFriendListOfUser);
export default friendListRouter;
