import { Router } from 'express';


import {
  createAppointment,
  getAppointmentById,
  getAllAppointments,
  updateAppointmentById,
  deleteAppointmentById,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId
} from '../controllers/appointmentController';

const router = Router();

router.post('/create', createAppointment);
router.get('/get/:id', getAppointmentById);
router.get('/getAll', getAllAppointments);
router.put('/update/:id', updateAppointmentById);
router.delete('/delete/:id', deleteAppointmentById);
router.get('/patient/:pat_id', getAppointmentsByPatientId);
router.get('/doctor/:doc_id', getAppointmentsByDoctorId);

export default router;