import mongoose, { Document, Schema, model } from 'mongoose';

export interface ITimeSlot extends Document {
  doctorId: Schema.Types.ObjectId; // Reference to the Doctor
  start: Date; // Start time of the time slot
  end: Date; // End time of the time slot
  isAvailable: boolean; // Availability status
}

const timeSlotSchema: Schema = new Schema({
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true }, // Doctor reference
  start: { type: Date, required: true }, // Start time of the slot
  end: { type: Date, required: true }, // End time of the slot
  isAvailable: { type: Boolean, default: true }, // Default to true, indicating the slot is available
});

// Export the TimeSlot model
export const TimeSlotModel = model<ITimeSlot>('TimeSlot', timeSlotSchema);
