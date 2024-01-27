import likeRepository from "./like.repository.js"

export default class likeController{
    constructor(){
        this.likeRepository = new likeRepository();
    }

    registerLikeForPost = async (req, res)=>{
        try{
            const userId = req.userId;
            const postId = req.query.postId;
            console.log(userId, postId);
            const result = await this.likeRepository.registerLike(userId, postId);
            res.status(201).json({status:"Success", message:result});
        }catch(err){
            console.log(err);
            res.status(400).send("Some error Occured in like controller")
        }
    }

    toggleLike = async (req, res)=>{
        try{
            const postId = req.query.postId;
            const userId = req.userId;
            const result = await this.likeRepository.toggleLike(userId, postId);
            res.status(202).json({status:"Success", response:result});
        }catch(err){
            console.log(err);
            res.status(400).send("Some error occured in controller")
        }
    }

    getAllLikesOfPost = async (req, res)=>{
        try{
            const postId = req.query.postId;
            const result = await this.likeRepository.getAllLikesOnPost(postId);
            res.status(200).json({status:"Success", response:result});
        }catch(err){
            console.log(err);
            res.status(400).send("Some error occured in like controller");
        }
    }
}