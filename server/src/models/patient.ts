import { Schema, model, Document } from 'mongoose';
import { Role } from './doctor'; 

export interface IPatient extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  mobile: number;
  email: string;
  password: string;
  role: Role;
  otp?: string;
  reason?: string;
  symptoms?: string;
  location: string;
  otpExpiration?: number;
  appointments?: Array<{
      _id: any; doctorId: string, start: Date, end: Date, mode: string;
  }>;
}

const PatientSchema = new Schema<IPatient>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Role, default: Role.PATIENT, required: true },
  otp: { type: String },
  otpExpiration: { type: Number },
  reason: { type: String },
  symptoms: { type: String },
  location: { type: String, required: true },
  appointments: [{
    _id: { type: Schema.Types.ObjectId, auto: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    start: { type: Date },
    end: { type: Date },
    mode: { type: String, required: true }
  }]
});

export const PatientModel = model<IPatient>('Patient', PatientSchema);