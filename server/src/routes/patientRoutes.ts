import express from 'express';
import { loginPatient,registerPatient,updatePatient,getPatient,deletePatient,getAllPatients } from '../controllers/patientContoller';
const router = express.Router();

router.post('/login', loginPatient);
router.post('/register', registerPatient);
router.put('/update/:patientId', updatePatient);
router.get('/getId/:patientId', getPatient);
router.delete('/delete/:patientId', deletePatient);
router.get('/get', getAllPatients); 
export default router;
