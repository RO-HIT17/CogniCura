import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import otpRoutes from './routes/otpRoutes';

dotenv.config(); 
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);

const PORT = process.env.PORT!;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
