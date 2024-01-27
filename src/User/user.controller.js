import userRepository from "./user.repository.js"
import { hashPassword } from "../Middlewares/bcrypt.js";
import { checkIfAlreadyLoggedIn } from "../Middlewares/jsonWebToken.js";
export default class userController{
    constructor(){
        this.repository = new userRepository;
    }
    
    registerUser = async (req, res)=>{
        try{
            req.body.password = await hashPassword(req.body.password);
            const result = await this.repository.registerNewUser(req.body);
            console.log(result);
            res.status(201).json({status:"Success",DataStored:{result}});
        }catch(err){
            console.log(err)
            res.status(200).json({status:"Failed", Error:err});
        }
    }

    userLogIn = async (req, res)=>{
        try{
            const ifLoggedIn = checkIfAlreadyLoggedIn(req, res);
            if(ifLoggedIn){
                return res.status(200).json({status:"Success", message:"You are already logged In"})
            }
            const result = await this.repository.logIn(req.user);
            console.log(result);
            res.status(200).json({status:"Success", Message: result});
        }catch(err){
            console.log(err)
            res.status(200).json({status:"Failed", Error:err});
        }
    }

    updateUserProfile = async (req, res)=>{
        try{
            const userId = req.userId;
            const result = await this.repository.updateUsersProfile(userId, req.body);
            res.status(201).json({status:"Success", response:result});
        }catch(err){
            console.log(err);
            res.status(400).send("Some error occured in user controller.");
        }
    }
}