import { Request, Response } from 'express';
import { PatientModel } from '../models/patient';


export const createPatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const patient = new PatientModel(req.body);
    await patient.save();
    res.status(201).json(patient);
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