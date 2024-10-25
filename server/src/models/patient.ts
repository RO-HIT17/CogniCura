import { Schema, model, Document } from 'mongoose';
import { Role } from './doctor';
export interface IPatient extends Document {
    _id:string;
    first_name: string;
    last_name: string;
    email: string;
    password:string;
    phone: string;
    date_of_birth: Date;
    medical_history: string;
    role:Role;
    otp?: string;
    otpExpiration?: number;
  }
  
  const patientSchema: Schema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    medical_history: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: Role, default: Role.PATIENT, required: true },
    otp: { type: String },
    otpExpiration: { type: Number },
  });

export const PatientModel = model<IPatient>('Patient', patientSchema);