import express from 'express';
import OTPController from './opt.controller.js';
import { verifyAuthToken } from '../Middlewares/jsonWebToken.js';

const OTPRouter = express();

OTPRouter.post('/generateOTP', verifyAuthToken, OTPController.sendOTPForPasswordChange);
OTPRouter.put('/changePassword', verifyAuthToken, OTPController.verifyOTPAndChangePassword);

export default OTPRouter;