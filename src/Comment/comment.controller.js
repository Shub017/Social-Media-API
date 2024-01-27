import commentRepository from "./comment.repository.js";

export default class commentController {
    constructor(){
        this.commentRepository = new commentRepository();
    }

    // Function to add new comment on given postId
    addNewComment = async (req, res)=>{
        try{

            const userId = req.userId;
            const postId = req.query.postId;
            const comment = req.body.comment;
            console.log(userId, postId, comment);
            const result = await this.commentRepository.addComment(postId, userId, comment);
            res.status(201).json({status:"success", Response:result});

        }catch(err){
            console.log(err);
            return "Some error occrued in controller";
        }
    }

    // Function to make a change in the existing comment
    updateCommentById = async (req, res)=>{
        try{
            const commentId = req.query.commentId;
            const comment = req.body.comment;

            console.log(commentId, comment);
            const result = await this.commentRepository.updateComment(commentId, comment, req.userId);
            console.log(result);
            res.status(201).json({status:"Success", response:result});
        }catch(err){
            console.log(err)
            res.status(400).json({status:"Failed", message:"Some problem occured in comment controller"});
        }
    }

    // Fetcha comment by it's ID
    getCommentById = async (req, res)=>{
        try{
            const commentId = req.query.commentId;
            const result = await this.commentRepository.getComment(commentId);
            res.status(200).json({status:"Success", response:result});
        }catch(err){
            console.log(err);
            res.send(400).send("There is some error in comment controller");
        }
    }

    deleteCommentById = async (req, res)=>{
        try{
            const commentId = req.query.commentId;
            const result = await this.commentRepository.deleteComment(commentId);
            res.status(200).json({status:"Success", response:result});
        }catch(err){
            console.log(err)
            res.status(400).send("Some error occured in comment controller");
        }
    }
} 