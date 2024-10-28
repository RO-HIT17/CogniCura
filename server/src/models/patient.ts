import {Schema, model, Document} from 'mongoose';
import { Role } from './enums';

export interface IPatient extends Document {
    _id:string;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    phone:number;
    role:Role;
}

const patientSchema:Schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: Role, default: Role.PATIENT, required: true },
});

export const PatientModel = model<IPatient>('Patient', patientSchema);