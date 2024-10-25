import mongoose, { Document, Schema,model } from 'mongoose';

export interface IAppointment extends Document {
  patient_id: Schema.Types.ObjectId;
  doctor_id: Schema.Types.ObjectId;
  appointment_time: Date;
  status: 'scheduled' | 'canceled' | 'completed' | 'rescheduled';
  reason?: string;
  calendar_event_id?: string;
}

const appointmentSchema: Schema = new Schema({
  patient_id: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor_id: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  appointment_time: { type: Date, required: true },
  status: { type: String, enum: ['scheduled', 'canceled', 'completed', 'rescheduled'], default: 'scheduled' },
  reason: String,
  calendar_event_id: String,
});

export const AppointmentModel = model<IAppointment>('Appointment', appointmentSchema);