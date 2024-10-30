import { Router } from 'express';
import { docResetPassword,patResetPassword, sendOTP, verifyOTPController } from '../controllers/otpController';

const router = Router();

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTPController);
router.post('/doc/reset-password', docResetPassword);
router.post('/pat/reset-password', patResetPassword);

export default router;