import { Request, Response } from 'express';
import { DoctorModel } from '../models/doctor';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';

export const createDoctor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { password, ...doctorData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = new DoctorModel({ ...doctorData, password: hashedPassword });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const loginDoctor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const doctor = await DoctorModel.findOne({ email });
    if (!doctor) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const token = generateToken(doctor._id.toString(), doctor.role);
    res.status(200).json({ token , doc_id : doctor._id });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getDoctorsBySpecialization = async (req: Request, res: Response): Promise<void> => {
  try {
    const { specialization } = req.body;
    const doctors = await DoctorModel.find({ specialization });
    if (doctors.length === 0) {
      res.status(404).json({ message: 'No doctors found with this specialization' });
      return;
    }
    res.status(200).json(doctors);
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