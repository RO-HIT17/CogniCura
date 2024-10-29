import { Router } from 'express';


import {
  createAppointment,
  getAppointmentById,
  getAllAppointments,
  updateAppointmentById,
  deleteAppointmentById
} from '../controllers/appointmentController';

const router = Router();

router.post('/create', createAppointment);
router.get('/get/:id', getAppointmentById);
router.get('/getAll', getAllAppointments);
router.put('/update/:id', updateAppointmentById);
router.delete('/delete/:id', deleteAppointmentById);

export default router;