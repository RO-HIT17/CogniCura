import { Request, Response } from 'express';
import { DoctorModel } from '../models/doctor';

export const createDoctor = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctor = new DoctorModel(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getDoctorById = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctor = await DoctorModel.findById(req.params.id);
    if (!doctor) {
      res.status(404).json({ message: 'Doctor not found' });
      return;
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getAllDoctors = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctors = await DoctorModel.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updateDoctorById = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctor = await DoctorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) {
      res.status(404).json({ message: 'Doctor not found' });
      return;
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteDoctorById = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctor = await DoctorModel.findByIdAndDelete(req.params.id);
    if (!doctor) {
      res.status(404).json({ message: 'Doctor not found' });
      return;
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};