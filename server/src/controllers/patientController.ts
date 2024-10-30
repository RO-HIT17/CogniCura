import { Request, Response } from 'express';
import { PatientModel } from '../models/patient';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';

export const createPatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { password, ...patientData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const patient = new PatientModel({ ...patientData, password: hashedPassword });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};


export const loginPatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const patient = await PatientModel.findOne({ email });
    if (!patient) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, patient.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const token = generateToken(patient._id.toString(), patient.role);
    res.status(200).json({ token,pat_id:patient._id });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
export const getPatientById = async (req: Request, res: Response): Promise<void> => {
  try {
    const patient = await PatientModel.findById(req.params.id);
    if (!patient) {
      res.status(404).json({ message: 'Patient not found' });
      return;
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getAllPatients = async (req: Request, res: Response): Promise<void> => {
  try {
    const patients = await PatientModel.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updatePatientById = async (req: Request, res: Response): Promise<void> => {
  try {
    const patient = await PatientModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) {
      res.status(404).json({ message: 'Patient not found' });
      return;
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deletePatientById = async (req: Request, res: Response): Promise<void> => {
  try {
    const patient = await PatientModel.findByIdAndDelete(req.params.id);
    if (!patient) {
      res.status(404).json({ message: 'Patient not found' });
      return;
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};