import { Schema, model, Document } from 'mongoose';
import { Specialization, Reason, AppointmentMode, Location } from './enums';

export interface IAppointment extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  specialityRequired: Specialization;
  reason: Reason;
  mode: AppointmentMode;
  symptoms: string;
  location: Location;
  sendRemainders: boolean;
  doc_id: Schema.Types.ObjectId; 
  pat_id: Schema.Types.ObjectId; 
  starttime: Date;
  endtime: Date;
}

const appointmentSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialityRequired: { type: String, enum: Specialization, required: true },
  reason: { type: String, enum: Reason, required: true },
  mode: { type: String, enum: AppointmentMode, required: true },
  symptoms: { type: String, required: true },
  location: { type: String, enum: Location, required: true },
  sendRemainders: { type: Boolean, required: true },
  doc_id: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  pat_id: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  starttime: { type: Date, required: true },
  endtime: { type: Date, required: true },
});

export const AppointmentModel = model<IAppointment>('Appointment', appointmentSchema);