import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import cors from 'cors';
//import authRoutes from './routes/authRoutes';
import doctorRoutes from './routes/doctorRoutes';
import patientRoutes from './routes/patientRoutes';
import otpRoutes from './routes/otpRoutes';

dotenv.config(); 
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/doctor', doctorRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/otp', otpRoutes);

const PORT = process.env.PORT!;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
