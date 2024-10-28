import twilio from 'twilio';
import dotenv from 'dotenv';
import transporter from '../config/nodeMailer';

dotenv.config(); 

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendNotification = async (patientEmail: string, patientPhone: string, message: string) => {
  try {
     console.log('Email sent successfully to:', patientEmail);
    const emailOptions = {
      from: process.env.EMAIL_USER,
      to: patientEmail,
      subject: 'Appointment Reminder',
      text: message,
    };
    await transporter.sendMail(emailOptions);

    if (patientPhone) {
      await twilioClient.messages.create({
        to: patientPhone,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: message,
      });
    } else {
      console.warn(`Patient with email ${patientEmail} does not have a phone number. SMS not sent.`);
    }
  } catch (error) {
    console.error('Error sending notification:', error);
    throw new Error('Failed to send notification');
  }
};
