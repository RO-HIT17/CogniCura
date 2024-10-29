import { Router } from 'express';
import {
    loginPatient,
    createPatient,
    getPatientById,
    getAllPatients,
    updatePatientById,
    deletePatientById
  } from '../controllers/patientController';
  

const router = Router();

router.post('/register', createPatient);
router.get('/get/:id', getPatientById);
router.post('/login', loginPatient);
router.get('/getAll', getAllPatients);
router.put('/update/:id', updatePatientById);
router.delete('/delete/:id', deletePatientById);

export default router;