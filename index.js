// Importing all the dependencies
import express from 'express';
import 'dotenv/config'
import userRouter from './src/User/user.router.js';
import postRouter from './src/Posts/posts.router.js';
import commentRouter from './src/Comment/comment.router.js';
import likeRouter from './src/Like/like.router.js';
import friendListRouter from './src/FriendsList/friendsList.router.js';
import OTPRouter from './src/OTP/otp.router.js';

const app = express();
app.use(express.json());
// console.log(process.env) // remove this after you've confirmed it is working
// Setting a default path
app.get('/',(req, res)=>{
    res.send("Welcome to POST-2");
})

app.use('/User', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/like', likeRouter);
app.use('/friends', friendListRouter);
app.use('/OTP', OTPRouter);
export default app;
