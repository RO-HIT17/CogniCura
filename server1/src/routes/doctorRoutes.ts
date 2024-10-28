import { Router } from 'express';
import {
  registerDoctor,
  updateDoctor,
  loginDoctor,
  getDoctor,
  deleteDoctor
} from '../controllers/doctorController';

const router = Router();

router.post('/register', registerDoctor);
router.post('/login', loginDoctor);
router.put('/update', updateDoctor);
router.get('/:doctorId', getDoctor);
router.delete('/:doctorId', deleteDoctor);

export default router;