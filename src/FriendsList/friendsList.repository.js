import mongoose from "mongoose";
import { friendRequestSchema } from "./friends.schema.js/friendsRequest.schema.js";
import { friendsListSchema } from "./friends.schema.js/friendsList.schema.js";

export default class FriendListRepository {
    constructor() {
        this.friendRequestmodel = mongoose.model('friendrequests', friendRequestSchema);
        this.friendsListmodel = mongoose.model('friendslists', friendsListSchema);
    }

    sendFriendRequest = async (userId, friendId) => {
        try {
            // Check if there is an existing friend request from userId to friendId
            const existingRequest = await this.friendRequestmodel.findOne({
                userId: friendId,
                pendingRequests: userId,
            });

            if (existingRequest) {
                console.log(`Friend request from ${userId} to ${friendId} already exists.`);
                return existingRequest;
            }

            // If no existing request, add the friendId to the pendingRequests array
            const updatedFriendRequest = await this.friendRequestmodel.findOneAndUpdate(
                { userId: friendId },
                { $push: { pendingRequests: userId } },
                { new: true }
            );

            console.log(`Friend request sent from ${userId} to ${friendId}.`);
            return updatedFriendRequest;
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    }

    acceptFriendRequest = async (userId, friendId) => {
        try {
            // userId: The one who is accepting the request,
            // friendId: The one who is getting his/her friend request accepted.
    
            // Check if the friend request exists
            const friendRequest = await this.friendRequestmodel.findOne({
                userId: userId,
                pendingRequests: friendId,
            });
    
            if (!friendRequest) {
                console.log(`Friend request from ${friendId} to ${userId} does not exist.`);
                return "Friend request not found";
            }
    
            // Check if they are already friends
            const areFriends = await this.friendsListmodel.exists({
                userId: userId,
                friendList: friendId,
            });
    
            if (areFriends) {
                console.log(`${userId} and ${friendId} are already friends.`);
                return "Already friends";
            }
    
            // Remove the friend request
            const updatedFriendRequestList = await this.friendRequestmodel.findOneAndUpdate(
                { userId: userId },
                { $pull: { pendingRequests: friendId } },
                { new: true }
            );
    
            console.log(updatedFriendRequestList);
    
            // Add the friend to the friend list
            const updatedFriendList = await this.friendsListmodel.findOneAndUpdate(
                { userId: userId },
                { $push: { friendList: friendId } },
                { new: true }
            );
    
            console.log(updatedFriendList);
            return updatedFriendList;
        } catch (err) {
            console.log(err);
            return "Some error occurred in repository";
        }
    };

    retrieveFriendList = async (userId)=>{
        try{
            const friendList = await this.friendsListmodel.findOne({
                userId:userId
            });

            if(!friendList){
                return "Data for friend List not found";
            }

            return friendList.friendList;

        }catch(err){
            console.log(err);
            return "Some error occured in FriendsList repository";
        }
    } 
}
