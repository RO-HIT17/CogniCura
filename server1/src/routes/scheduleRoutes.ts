// routes/scheduleRoutes.ts
import { Router } from 'express';
import { getSchedules, getSchedulesByDate, addSchedule, deleteSchedule } from '../controllers/scheduleController';

const router = Router();

router.get('/sc/get', getSchedules);
router.get('/sc/:date', getSchedulesByDate);
router.post('/sc/post', addSchedule);
router.delete('/sc:id', deleteSchedule);

export default router;
