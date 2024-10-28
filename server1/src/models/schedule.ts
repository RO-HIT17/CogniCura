// models/schedule.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Schedule extends Document {
  date: string;
  time: string;
  patientName: string;
  reason: string;
  contact: string;
  symptoms: string;
  scheduleMode: 'Online' | 'Offline';
  files: string[];
}

const ScheduleSchema = new Schema<Schedule>({
  date: { type: String, required: true },
  time: { type: String, required: true },
  patientName: { type: String, required: true },
  reason: { type: String, required: true },
  contact: { type: String, required: true },
  symptoms: { type: String, required: true },
  scheduleMode: { type: String, enum: ['Online', 'Offline'], required: true },
  files: [{ type: String }],
});

export default mongoose.model<Schedule>('Schedule', ScheduleSchema);
