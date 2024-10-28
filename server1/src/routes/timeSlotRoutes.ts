import { Router } from 'express';
import {
  createTimeSlot,
  getAllTimeSlots,
  getTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
} from '../controllers/timeSlotController'; 

const router = Router();

router.post('/create', createTimeSlot);


router.get('/get', getAllTimeSlots);


router.get('/get/:timeSlotId', getTimeSlot);


router.put('/update/:timeSlotId', updateTimeSlot);

router.delete('/delete/:timeSlotId', deleteTimeSlot);

export default router;
