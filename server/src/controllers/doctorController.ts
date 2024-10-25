import { Request, Response } from 'express';
import { DoctorModel, IDoctor } from '../models/doctor';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';  

export const loginDoctor = async (req: Request, res: Response):Promise<void> => {
  const { email, password } = req.body;


  const doctor = await DoctorModel.findOne({ email });
  if (!doctor) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
    return;
  }

  const isMatch = await bcrypt.compare(password, doctor.password);
  if (!isMatch) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
    return;
  }

  const token = generateToken(doctor._id.toString(), doctor.role);
  res.status(200).json({ success: true, token, id: doctor._id });
};

export const registerDoctor = async (req: Request, res: Response):Promise<void> => {
  try {
    const { first_name, last_name, email, phone, password, specialization } = req.body;

    const existingDoctor = await DoctorModel.findOne({ email });
    if (existingDoctor) {
      res.status(400).json({ msg: 'Doctor with this email already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new DoctorModel({
      first_name,
      last_name,
      email,
      phone,
      specialization,
      password: hashedPassword,
    });

    await doctor.save();
    const token = generateToken(doctor._id.toString(), "doctor"); // Assuming role is "doctor"

    res.status(201).json({ success: true, data: doctor, token });
  } catch (error) {
    console.error('Error registering doctor:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateDoctor = async (req: Request, res: Response):Promise<void> => {
  try {
    const { doctorId } = req.params;
    const { first_name, last_name, email, phone, specialization } = req.body;

    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) {
      res.status(404).json({ msg: 'Doctor not found' });
      return;
    }

    if (first_name) doctor.first_name = first_name;
    if (last_name) doctor.last_name = last_name;
    if (email) doctor.email = email;
    if (phone) doctor.phone = phone;
    if (specialization) doctor.specialization = specialization;

    await doctor.save();
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getDoctor = async (req: Request, res: Response):Promise<void> => {
  try {
    const { doctorId } = req.params;
    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) {
      res.status(404).json({ msg: 'Doctor not found' });
      return;
    }
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteDoctor = async (req: Request, res: Response):Promise<void> => {
  try {
    const { doctorId } = req.params;
    const doctor = await DoctorModel.findByIdAndDelete(doctorId);
    if (!doctor) {
      res.status(404).json({ msg: 'Doctor not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
