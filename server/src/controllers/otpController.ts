import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import transporter from '../config/nodeMailer';
import { generateOTP, generateOTPExpiration  } from '../utils/otp';
import { verifyOTP } from '../utils/otp';
import bcrypt from 'bcryptjs';

export const sendOTP = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const otp = generateOTP();
  const otpExpiration = generateOTPExpiration();

  user.otp = otp;
  user.otpExpiration = otpExpiration;
  await user.save();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It will expire in 90 seconds.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
       res.status(500).json({ message: 'Error sending email', error });
       return;
    }
    res.status(200).json({ message: 'OTP sent successfully' });
  });
};

export const verifyOTPController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, otp } = req.body;
      
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      if (!user.otp || !user.otpExpiration) {
        
        res.status(400).json({ message: 'OTP not requested' });
        return;
      }
  
      const isValid = verifyOTP(otp, user.otp, user.otpExpiration);
      
  
      if (!isValid) {
        
        res.status(400).json({ message: 'Invalid or expired OTP' });
        return;
      }
  
      user.otp = undefined;
      user.otpExpiration = undefined;
      await user.save();
  
      
      res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
      console.error('Error in verifyOTPController:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email , newPassword } = req.body;
      
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error in resetPassword:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };