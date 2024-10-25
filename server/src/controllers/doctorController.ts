import { Request, Response } from 'express';
import { DoctorModel, IDoctor } from '../models/doctor';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

export const registerDoctor = async (req: Request, res: Response) => {
  const { firstName, lastName, userName, mobile, email, password, role, specialization } = req.body;
  const existingEmail: IDoctor | null = await DoctorModel.findOne({ email });
  const existingUser: IDoctor | null = await DoctorModel.findOne({ userName });

  if (existingUser || existingEmail) {
    res.status(400).json({ msg: 'Doctor already exists' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const doctor = new DoctorModel({ firstName, lastName, userName, mobile, email, password: hashedPassword, role, specialization });

  await doctor.save();
  const token = generateToken(doctor._id.toString(), doctor.role);
  res.status(201).json({ success: true, data: doctor, token });
};

export const updateDoctor = async (req: Request, res: Response) => {
  try {
    const { doctorId, firstName, lastName, mobile, email, password, role, specialization } = req.body;
    const doctor = await DoctorModel.findById(doctorId);

    if (!doctor) {
      res.status(404).send('Doctor not found');
      return;
    }

    if (firstName) doctor.firstName = firstName;
    if (lastName) doctor.lastName = lastName;
    if (mobile) doctor.mobile = mobile;
    if (specialization) doctor.specialization = specialization;

    if (email) {
      const existingDoctor = await DoctorModel.findOne({ email });
      if (existingDoctor && existingDoctor._id.toString() !== doctorId) {
        res.status(400).send('Email is already taken');
        return;
      }
      doctor.email = email;
    }

    

    if (password) {
      const salt = await bcrypt.genSalt(10);
      doctor.password = await bcrypt.hash(password, salt);
    }

    if (role) doctor.role = role;

    await doctor.save();
    res.status(200).json({ message: 'Doctor updated successfully' });
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).send('Server error');
  }
};

export const loginDoctor = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const doctor = await DoctorModel.findOne({ email });

  if (!doctor || !(await bcrypt.compare(password, doctor.password))) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
    return;
  }

  const token = generateToken(doctor._id.toString(), doctor.role);
  const id = doctor._id;
  res.status(200).json({ success: true, token, id });
};

export const getDoctor = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    const doctor = await DoctorModel.findById(doctorId);

    if (!doctor) {
      res.status(404).send('Doctor not found');
      return;
    }

    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).send('Server error');
  }
};

export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    const doctor = await DoctorModel.findByIdAndDelete(doctorId);

    if (!doctor) {
      res.status(404).send('Doctor not found');
      return;
    }

    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).send('Server error');
  }
};

export const updateAvailableSlots = async (doctorId: string, slots: Array<{ start: Date, end: Date }>) => {
    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) throw new Error('Doctor not found');
    doctor.availableSlots = slots;
    return doctor.save();
};


export const sendNotification = async (doctorId: string, message: string) => {
    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) throw new Error('Doctor not found');
    // Implement email or SMS notification logic here
    console.log(`Sending notification to ${doctor.email}: ${message}`);
};


export const scheduleAppointment = async (doctorId: string, patientId: string, slot: { start: Date, end: Date }) => {
    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) throw new Error('Doctor not found');
    doctor.appointments = doctor.appointments || [];
    doctor.appointments.push({
        patientId, start: slot.start, end: slot.end,
        _id: undefined,
        mode: ''
    });
    return doctor.save();
};


export const cancelAppointment = async (doctorId: string, appointmentId: string) => {
    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) throw new Error('Doctor not found');
    doctor.appointments = (doctor.appointments || []).filter(appointment => appointment._id.toString() !== appointmentId);
    return doctor.save();
};