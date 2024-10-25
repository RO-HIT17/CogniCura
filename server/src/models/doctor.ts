import { Schema, model, Document } from 'mongoose';

export enum Role {
    PATIENT = 'patient',
    DOCTOR = 'doctor',
}

export interface IDoctor extends Document {
  _id:string;
  first_name: string;
  last_name: string;
  email: string;
  password:string;
  phone: string;
  specialization: string;
  role:Role;
  otp?: string;
  otpExpiration?: number;
}

const doctorSchema: Schema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  role: { type: String, enum: Role, default: Role.DOCTOR, required: true },
  otp: { type: String },
  otpExpiration: { type: Number },
});
export const DoctorModel = model<IDoctor>('Doctor', doctorSchema);