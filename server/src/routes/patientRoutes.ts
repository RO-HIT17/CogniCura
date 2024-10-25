import { Router } from 'express';
import { registerPatient, updatePatient,loginPatient,getPatient,deletePatient } from '../controllers/patientContoller.js';
const router = Router();

router.post('/register', registerPatient);
router.post('/login', loginPatient);
router.put('/update', updatePatient);
router.get('/:patientId', getPatient);
router.delete('/:patientId', deletePatient);

export default router;