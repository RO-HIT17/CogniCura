import crypto from 'crypto';

const OTP_LENGTH = 6;
const OTP_EXPIRATION_TIME = 1.5 * 60 * 1000; 

export const generateOTP = () => {
    let otp = '';
    for (let i = 0; i < OTP_LENGTH; i++) {
      otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
};

export const generateOTPExpiration = () => {
  return Date.now() + OTP_EXPIRATION_TIME;
};

export const verifyOTP = (otp: string, storedOtp: string, expirationTime: number) => {
  if (Date.now() > expirationTime) {
    return false;
  }
  return otp === storedOtp;
};