import OTPModel from "./optModel/otp.model.js";
import { UserRegistrationSchema } from "../User/User Models/userRegistration.Schema.js";
import mongoose from "mongoose";
import { hashPassword } from "../Middlewares/bcrypt.js";

const UserModel = mongoose.model('users', UserRegistrationSchema);

class OTPRepository {
    
    static createOTP(email, otpValue) {
        return OTPModel.create({ email, otp: otpValue });
    }

    static findOTPByEmail(email) {
        return OTPModel.findOne({ email });
    }

    static deleteOTPByEmail(email) {
        return OTPModel.deleteOne({ email });
    }

    static async updatePassword(email, password) {
        try {
            // Find the user by email
            const user = await UserModel.findOne({ email });

            if (!user) {
                throw new Error('User not found');
            }

            password = await hashPassword(password);
            // Update the user's password
            user.password = password;

            // Save the updated user
            const updatedUser = await user.save();

            return updatedUser;
        } catch (error) {
            console.error('Error updating password:', error);
            throw error; // Rethrow the error for higher-level handling
        }
    }
}

export default OTPRepository;
