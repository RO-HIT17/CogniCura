import { Request, Response } from 'express';
import { AppointmentModel } from '../models/appointments'; 
import { DoctorModel } from '../models/doctor'; 
import { PatientModel } from '../models/patient'; 
import { TimeSlotModel } from '../models/timeSlot'; // Ensure to import your TimeSlot model
import { sendNotification } from '../utils/notifcationService';
import dotenv from 'dotenv';
dotenv.config(); 

export const scheduleAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { patient_id, doctor_id, appointment_time, status, reason } = req.body;

    const patient = await PatientModel.findById(patient_id);
    const doctor = await DoctorModel.findById(doctor_id);
    if (!patient || !doctor) {
      res.status(404).json({ msg: 'Patient or Doctor not found' });
      return;
    }

    // Check for the corresponding time slot
    const timeSlot = await TimeSlotModel.findOne({
      doctorId: doctor_id,
      start: appointment_time,
      isAvailable: true,
    });

    if (!timeSlot) {
      res.status(400).json({ msg: 'Selected time slot is not available' });
      return;
    }

    const appointment = new AppointmentModel({
      patient_id,
      doctor_id,
      appointment_time,
      status,
      reason,
    });

    // Send notification to the patient
    const patientMessage = `Your appointment with Dr. ${doctor.last_name} has been scheduled for ${appointment_time}.`;
    if (patient.email) {
      await sendNotification(patient.email, patient.phone, patientMessage);
    } else {
      console.warn(`Patient with ID ${patient_id} has no email address. Notification not sent.`);
    }

    // Mark the time slot as unavailable
    timeSlot.isAvailable = false; // Update the time slot's availability
    await timeSlot.save(); // Save the updated time slot

    // Save the appointment
    await appointment.save();
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { appointmentId } = req.params;
    const { status, reason, newAppointmentTime } = req.body; 

    const appointment = await AppointmentModel.findById(appointmentId);
    if (!appointment) {
      res.status(404).json({ msg: 'Appointment not found' });
      return;
    }

    // Find the old time slot and mark it as available again
    const oldTimeSlot = await TimeSlotModel.findOne({
      doctorId: appointment.doctor_id,
      start: appointment.appointment_time,
    });

    if (oldTimeSlot) {
      oldTimeSlot.isAvailable = true; // Mark the old time slot as available
      await oldTimeSlot.save();
    }

    // Update the appointment details
    if (status) appointment.status = status;
    if (reason) appointment.reason = reason;

    // Update the appointment time and mark the new time slot as unavailable
    if (newAppointmentTime) {
      appointment.appointment_time = newAppointmentTime;

      // Check if the new time slot is available
      const newTimeSlot = await TimeSlotModel.findOne({
        doctorId: appointment.doctor_id,
        start: newAppointmentTime,
        isAvailable: true,
      });

      if (!newTimeSlot) {
        res.status(400).json({ msg: 'Selected time slot is not available' });
        return;
      }

      // Mark the new time slot as unavailable
      newTimeSlot.isAvailable = false;
      await newTimeSlot.save();
    }

    await appointment.save();
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { appointmentId } = req.params;
    const appointment = await AppointmentModel.findById(appointmentId).populate('patient_id doctor_id');
    if (!appointment) {
      res.status(404).json({ msg: 'Appointment not found' });
      return;
    }
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { appointmentId } = req.params;
    const appointment = await AppointmentModel.findById(appointmentId);
    if (!appointment) {
      res.status(404).json({ msg: 'Appointment not found' });
      return;
    }

    // Find the time slot and mark it as available
    const timeSlot = await TimeSlotModel.findOne({
      doctorId: appointment.doctor_id,
      start: appointment.appointment_time,
    });

    if (timeSlot) {
      timeSlot.isAvailable = true; // Mark the time slot as available again
      await timeSlot.save();
    }

    await AppointmentModel.findByIdAndDelete(appointmentId);
    res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointments = await AppointmentModel.find().populate('patient_id doctor_id');
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
