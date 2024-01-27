import postsRepository from "./posts.repository.js";

export default class postController{
    constructor(){
        this.postsRepository = new postsRepository();
    }

    createNewPost = async (req, res)=>{
        try{
            const result = await this.postsRepository.createPost(req.body, req.userId);
            res.status(201).json({status:"Success", message:result});
        }catch(err){
            console.log(err);
            res.status(400).json({status:"Failed", errMessage:err});
        }
    }

    getAllPostsById = async (req, res)=>{
        try{
            const result = await this.postsRepository.getAllPostsofId(req.userId);
            console.log(result)
            res.status(201).json({status:"success", message:result});
        }catch(err){
            console.log(err);
            res.status(400).json({status:"Failed", errMessage:err});
        }
    }

    deletePostById = async(req, res)=>{
        try{
            console.log("PostId: ", req.query.postId);
            const result = await this.postsRepository.deletePostById(req.query.postId, req.userId);
            console.log(result);
            res.status(201).json({status:"Success", Message:result});
        }catch(err){
            console.log(err);
            res.status(400).json({status:"Failed", errMessage:err});
        }
    }

    updatePostByID = async (req, res)=>{
        try{
            const result = await this.postsRepository.updatePost(req.body, req.query.postId);
            res.status(201).json({status:"Success", message:result});
        }catch(err){
            console.log(err);
            res.send(400).json({status:"Failed", errmessage:err});
        }
    }

    getPostById = async (req, res)=>{
        try{
            const result = await this.postsRepository.getPostById(req.query.postId);
            res.status(200).json({status:"success", Response:result});
        }catch(err){
            console.log(err);
            res.status(400).json({status:failed, message:err});
        }
    }
}