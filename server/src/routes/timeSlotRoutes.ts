import { Router } from 'express';
import {
  createTimeSlot,
  getAllTimeSlots,
  getTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
} from '../controllers/timeSlotController'; // Adjust the path as needed

const router = Router();

// Create a new time slot
router.post('/create', createTimeSlot);

// Get all time slots
router.get('/get', getAllTimeSlots);

// Get a time slot by ID
router.get('/get/:timeSlotId', getTimeSlot);

// Update a time slot
router.put('/update/:timeSlotId', updateTimeSlot);

// Delete a time slot
router.delete('/delete/:timeSlotId', deleteTimeSlot);

export default router;
