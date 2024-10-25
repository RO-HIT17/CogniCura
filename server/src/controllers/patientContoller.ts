import { Request, Response } from 'express';
import { PatientModel, IPatient } from '../models/patient';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

export const registerPatient = async (req: Request, res: Response) => {
  const { firstName, lastName, userName, mobile, email, password, role, reason, symptoms, location } = req.body;
  const existingEmail: IPatient | null = await PatientModel.findOne({ email });
  const existingUser: IPatient | null = await PatientModel.findOne({ userName });

  if (existingUser || existingEmail) {
    res.status(400).json({ msg: 'Patient already exists' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const patient = new PatientModel({ firstName, lastName, userName, mobile, email, password: hashedPassword, role, reason, symptoms, location });

  await patient.save();
  const token = generateToken(patient._id.toString(), patient.role);
  res.status(201).json({ success: true, data: patient, token });
};

export const updatePatient = async (req: Request, res: Response) => {
  try {
    const { patientId, firstName, lastName, mobile, email, password, role, reason, symptoms, location } = req.body;
    const patient = await PatientModel.findById(patientId);

    if (!patient) {
      res.status(404).send('Patient not found');
      return;
    }

    if (firstName) patient.firstName = firstName;
    if (lastName) patient.lastName = lastName;
    if (mobile) patient.mobile = mobile;
    if (reason) patient.reason = reason;
    if (symptoms) patient.symptoms = symptoms;
    if (location) patient.location = location;

    if (email) {
      const existingPatient = await PatientModel.findOne({ email });
      if (existingPatient && existingPatient._id.toString() !== patientId) {
        res.status(400).send('Email is already taken');
        return;
      }
      patient.email = email;
    }

    

    if (password) {
      const salt = await bcrypt.genSalt(10);
      patient.password = await bcrypt.hash(password, salt);
    }

    if (role) patient.role = role;

    await patient.save();
    res.status(200).json({ message: 'Patient updated successfully' });
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).send('Server error');
  }
};

export const loginPatient = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const patient = await PatientModel.findOne({ email });

  if (!patient || !(await bcrypt.compare(password, patient.password))) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
    return;
  }

  const token = generateToken(patient._id.toString(), patient.role);
  const id = patient._id;
  res.status(200).json({ success: true, token, id });
};

export const getPatient = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    const patient = await PatientModel.findById(patientId);

    if (!patient) {
      res.status(404).send('Patient not found');
      return;
    }

    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).send('Server error');
  }
};

export const deletePatient = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    const patient = await PatientModel.findByIdAndDelete(patientId);

    if (!patient) {
      res.status(404).send('Patient not found');
      return;
    }

    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).send('Server error');
  }
};
// Method to schedule an appointment
export const scheduleAppointment = async (patientId: string, doctorId: string, slot: { start: Date, end: Date }) => {
    const patient = await PatientModel.findById(patientId);
    if (!patient) throw new Error('Patient not found');
    if (!patient.appointments) {
        patient.appointments = [];
    }
    patient.appointments.push({
        doctorId, start: slot.start, end: slot.end,
        _id: undefined,
        mode: ''
    });
    return patient.save();
};

// Method to cancel an appointment
export const cancelAppointment = async (patientId: string, appointmentId: string) => {
    const patient = await PatientModel.findById(patientId);
    if (!patient) throw new Error('Patient not found');
    if (patient.appointments) {
        patient.appointments = patient.appointments.filter(appointment => appointment._id.toString() !== appointmentId);
    }
    return patient.save();
};

// Method to send notifications
export const sendNotification = async (patientId: string, message: string) => {
    const patient = await PatientModel.findById(patientId);
    if (!patient) throw new Error('Patient not found');
    // Implement email or SMS notification logic here
    console.log(`Sending notification to ${patient.email}: ${message}`);
};