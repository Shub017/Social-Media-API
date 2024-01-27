import friendListRepository from "./friendsList.repository.js";

export default class friendsListController{
    constructor(){
        this.friendListRepository = new friendListRepository();
    }

    sendFriendRequest = async (req, res)=>{
        try{
            const userId = req.userId;
            const friendId = req.query.friendId;
            const result = await this.friendListRepository.sendFriendRequest(userId, friendId);
            res.status(201).json({status:"Success", message:result});
        }catch(err){
            console.log(err)
            res.status(400).send("Some error occured in friendList Controller");
        }
    }

    acceptingFriendRequest = async (req, res)=>{
        try{
            const userId = req.userId;
            const friendId = req.query.friendId;
            const result = await this.friendListRepository.acceptFriendRequest(userId, friendId);
            res.status(201).json({status:"Success", message:result});
        }catch(err){
            console.log(err);
            res.status(400).send("Some error occured in friendList controller");
        }
    }

    getFriendListOfUser = async (req, res)=>{
        try{
            const userId = req.userId;
            const result = await this.friendListRepository.retrieveFriendList(userId);
            res.status(200).json({status:"success", response:result});
        }catch(err){
            console.log(err);
            res.status(400).send("Some error occured in friendsList repository")
        }
    }
}