import { Router } from 'express';


import {
  createAppointment,
  getAppointmentById,
  getAllAppointments,
  updateAppointmentById,
  deleteAppointmentById
} from '../controllers/appointmentController';

const router = Router();

router.post('/appointments', createAppointment);
router.get('/appointments/:id', getAppointmentById);
router.get('/appointments', getAllAppointments);
router.put('/appointments/:id', updateAppointmentById);
router.delete('/appointments/:id', deleteAppointmentById);

export default router;