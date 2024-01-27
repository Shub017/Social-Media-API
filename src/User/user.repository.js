// Import all the depedencies
import mongoose from "mongoose";
import { UserRegistrationSchema} from "./User Models/userRegistration.Schema.js";
import { comparePasswords } from "../Middlewares/bcrypt.js";
import { generateAuthToken, verifyAuthToken, checkIfAlreadyLoggedIn } from "../Middlewares/jsonWebToken.js";
import { friendRequestSchema } from "../FriendsList/friends.schema.js/friendsRequest.schema.js";
import { friendsListSchema } from "../FriendsList/friends.schema.js/friendsList.schema.js";

// Creating UserModel to validate the details provided by User
const userRegistrationModel = mongoose.model('User', UserRegistrationSchema);


export default class userRepository{
    constructor(){
        this.userRegistrationModel = userRegistrationModel;
        this.friendRequestModel = mongoose.model('friendRequests', friendRequestSchema);
        this.friendsListModel = mongoose.model('friendsList', friendsListSchema);
    }

    registerNewUser = async (userDetails)=>{
        try{
            const{name, age, email, password} = userDetails;
            const userInfo = new this.userRegistrationModel({
                name,
                age,
                email,
                password,
            });

            const result = await userInfo.save();

            const friendList = new this.friendsListModel({
                userId:email
            });

            const friendRequests = new this.friendRequestModel({
                userId:email
            })

            await friendList.save();
            await friendRequests.save();
            return result
        }catch(err){
            console.log(err);
        }
    }

    logIn = async (userCredentials)=>{
        try{
            
            const {email, password} = userCredentials;
            console.log("emailID: ",email, "password: ",password);
            const found = await userRegistrationModel.findOne({email:email});
            if(!found){
                return "Email not found not registered with PostAway-2";
            }
            const isMatch = await comparePasswords(password, found.password);
            if(isMatch){
                console.log(isMatch);
                const token = generateAuthToken(email, process.env.jwtSecretKey, '15m');
                const result = {
                    email:email,
                    password:password,
                    token:token,
                };
                return result;
            }
            else{
                return "Validation Failed, Your password is Wrong";
            }
        }catch(err){
            console.log(err);
        }
    }

    updateUsersProfile = async (userID, updates)=>{
        try{
            // Extract only the allowed fields (name, age, Avatar) from the 'updates' object
            const allowedUpdates = {};
            if (updates.name) {
                allowedUpdates.name = updates.name;
            }
            if (updates.age) {
                allowedUpdates.age = updates.age;
            }
            if (updates.Avatar) {
                allowedUpdates.Avatar = updates.Avatar;
            }

            const result = await this.userRegistrationModel.updateOne(
                {userId:userID},
                {$set:allowedUpdates}
            );

            // Check if the update was successful
            if(result.nModified > 0){
                return "User Profile updated successful"
            }
            else{
                return "User Profile was not found";
            }
        }catch(err){
            console.log(err);
        }
    }
} 