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
router.put('/:appointmentId', updateAppointment);
router.get('/:appointmentId', getAppointment);
router.delete('/:appointmentId', deleteAppointment);
router.get('/', getAllAppointments);

export default router;
