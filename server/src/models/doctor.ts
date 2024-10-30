import {Schema, model, Document} from 'mongoose';
import { Role } from './enums';
import { Specialization } from './enums';

export interface IDoctor extends Document {
    _id:string;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    phone:number;
    role:Role;
    specialization:Specialization;
    rating:number;
    experience:number;
    otp?: string;
    otpExpiration?: number;
}

const doctorSchema:Schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: Role, default: Role.DOCTOR, required: true },
    specialization: { type: String, enum: Specialization },
    rating: { type: Number},
    experience: { type: Number},
    otp: { type: String },
    otpExpiration: { type: Number },
});

export const DoctorModel = model<IDoctor>('Doctor', doctorSchema);