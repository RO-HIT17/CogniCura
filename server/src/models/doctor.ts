import { Schema, model, Document } from 'mongoose';

export enum Role {
    PATIENT = 'patient',
    DOCTOR = 'doctor',
}

export interface IDoctor extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  mobile: number;
  email: string;
  password: string;
  role: Role;
  otp?: string;
  otpExpiration?: number;
  specialization: string;
  calendarId?: string;
  availableSlots?: Array<{ start: Date, end: Date }>;
  appointments?: Array<{
      _id: any; patientId: string, start: Date, end: Date, mode: string;
  }>;
}

const DoctorSchema = new Schema<IDoctor>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Role, default: Role.DOCTOR, required: true },
    otp: { type: String },
    otpExpiration: { type: Number },
    specialization: { type: String, required: true },
    calendarId: { type: String },
    availableSlots: [{ start: { type: Date }, end: { type: Date } }],
    appointments: [{
        _id: { type: Schema.Types.ObjectId, auto: true },
        patientId: { type: Schema.Types.ObjectId, ref: 'Patient' },
        start: { type: Date },
        end: { type: Date },
        mode: { type: String, required: true }
    }]
});

export const DoctorModel = model<IDoctor>('Doctor', DoctorSchema);