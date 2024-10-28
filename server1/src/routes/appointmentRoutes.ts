import { Router } from 'express';
import {
  scheduleAppointment,
  updateAppointment,
  getAppointment,
  deleteAppointment,
  getAllAppointments,
} from '../controllers/appointmentController';

const router = Router();

router.post('/', scheduleAppointment);
router.put('/update/:appointmentId', updateAppointment);
router.get('/get/:appointmentId', getAppointment);
router.delete('/delete/:appointmentId', deleteAppointment);
router.get('/get', getAllAppointments);

export default router;
