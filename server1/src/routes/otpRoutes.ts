import { Router } from 'express';
import { resetPassword, sendOTP, verifyOTPController } from '../controllers/otpController';

const router = Router();

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTPController);
router.post('/reset-password', resetPassword);

export default router;