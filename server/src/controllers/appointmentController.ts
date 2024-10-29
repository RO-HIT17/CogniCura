import { Request, Response } from 'express';
import { AppointmentModel } from '../models/appointment';


export const createAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointment = new AppointmentModel(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getAppointmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointment = await AppointmentModel.findById(req.params.id);
    if (!appointment) {
      res.status(404).json({ message: 'Appointment not found' });
      return;
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getAllAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointments = await AppointmentModel.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updateAppointmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointment = await AppointmentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!appointment) {
      res.status(404).json({ message: 'Appointment not found' });
      return;
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteAppointmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointment = await AppointmentModel.findByIdAndDelete(req.params.id);
    if (!appointment) {
      res.status(404).json({ message: 'Appointment not found' });
      return;
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getAppointmentsByPatientId = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointments = await AppointmentModel.find({ pat_id: req.params.pat_id }).populate('doc_id', 'firstName lastName');
    if (appointments.length === 0) {
      res.status(404).json({ message: 'No appointments found for this patient' });
      return;
    }
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getAppointmentsByDoctorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointments = await AppointmentModel.find({ doc_id: req.params.doc_id }).populate('pat_id', 'firstName lastName email phone');
    if (appointments.length === 0) {
      res.status(404).json({ message: 'No appointments found for this doctor' });
      return;
    }
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};