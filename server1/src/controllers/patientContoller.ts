import { Request, Response } from 'express';
import { PatientModel, IPatient } from '../models/patient';
import bcrypt from 'bcryptjs'; 
import { generateToken } from '../utils/jwt'; 

export const loginPatient = async (req: Request, res: Response):Promise<void> => {
  const { email, password } = req.body;

  const patient = await PatientModel.findOne({ email });
  if (!patient) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
    return;
  }

  const isMatch = await bcrypt.compare(password, patient.password);
  if (!isMatch) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
    return;
  }

  const token = generateToken(patient._id.toString(), patient.role);
  res.status(200).json({ success: true, token, id: patient._id });
};

export const registerPatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { first_name, last_name, email, phone, date_of_birth, medical_history,password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingPatient = await PatientModel.findOne({ email });
    if (existingPatient) {
      res.status(400).json({ msg: 'Patient with this email already exists' });
      return;
    }

    const patient = new PatientModel({
      first_name,
      last_name,
      email,
      phone,
      date_of_birth,
      medical_history,
      password: hashedPassword,
    });

    await patient.save();
    const token = generateToken(patient._id.toString(), "patient"); 

    res.status(201).json({ success: true, data: patient, token });
  } catch (error) {
    console.error('Error registering patient:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const updatePatient = async (req: Request, res: Response):Promise<void>  => {
  try {
    const { patientId } = req.params;
    const { first_name, last_name, email, phone, date_of_birth, medical_history } = req.body;

    const patient = await PatientModel.findById(patientId);
    if (!patient) {
      res.status(404).json({ msg: 'Patient not found' });
      return;
    }

    if (first_name) patient.first_name = first_name;
    if (last_name) patient.last_name = last_name;
    if (email) patient.email = email;
    if (phone) patient.phone = phone;
    if (date_of_birth) patient.date_of_birth = date_of_birth;
    if (medical_history) patient.medical_history = medical_history;

    await patient.save();
    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getPatient = async (req: Request, res: Response):Promise<void> => {
  try {
    const { patientId } = req.params;
    const patient = await PatientModel.findById(patientId);
    if (!patient) {
      res.status(404).json({ msg: 'Patient not found' });
      return;
    }
    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const deletePatient = async (req: Request, res: Response):Promise<void> => {
  try {
    const { patientId } = req.params;
    const patient = await PatientModel.findByIdAndDelete(patientId);
    if (!patient) {
      res.status(404).json({ msg: 'Patient not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllPatients = async (req: Request, res: Response):Promise<void> => {
  try {
    const patients = await PatientModel.find();
    res.status(200).json({ success: true, data: patients });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
