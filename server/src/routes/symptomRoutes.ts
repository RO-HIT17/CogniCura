import { Router } from 'express';
import { processSymptoms } from '../controllers/symptomController';

const router = Router();

router.post('/process-symptoms', processSymptoms);

export default router;