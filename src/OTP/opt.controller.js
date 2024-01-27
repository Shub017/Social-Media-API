import nodemailer from 'nodemailer';
import crypto from 'crypto';
import OTPRepository from './opt.repository.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'codingninjas2k16@gmail.com',
    pass: 'slwvvlczduktvhdj',
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: 'your.email@gmail.com',
    to: process.env.email,
    subject: 'Password Change OTP',
    text: `Your OTP for password change is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error('Error sending OTP email:', error);
  }
};

class OTPController {
  static async sendOTPForPasswordChange(req, res) {
    const email  = req.userId;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const existingOTP = await OTPRepository.findOTPByEmail(email);

    if (existingOTP) {
      await OTPRepository.deleteOTPByEmail(email);
    }

    const otpValue = generateOTP();

    try {
      await OTPRepository.createOTP(email, otpValue);
      await sendOTPEmail(email, otpValue);
      return res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
      console.error('Error sending OTP:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async verifyOTPAndChangePassword(req, res) {
    const email = req.userId;
    const { otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ error: 'Email, OTP, and newPassword are required' });
    }

    const storedOTP = await OTPRepository.findOTPByEmail(email);

    if (!storedOTP || storedOTP.otp !== otp) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    try {
      // Perform password change logic here
      // For simplicity, let's just log the new password
      await OTPRepository.updatePassword(email, newPassword);
      console.log(`Password changed for ${email}. New password: ${newPassword}`);

      // Delete the used OTP
      await OTPRepository.deleteOTPByEmail(email);

      return res.status(200).json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error changing password:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default OTPController;
