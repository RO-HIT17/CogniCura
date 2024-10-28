import { Router } from 'express';
import {
    createPatient,
    getPatientById,
    getAllPatients,
    updatePatientById,
    deletePatientById
  } from '../controllers/patientController';
  

const router = Router();

router.post('/patients', createPatient);
router.get('/patients/:id', getPatientById);
router.get('/patients', getAllPatients);
router.put('/patients/:id', updatePatientById);
router.delete('/patients/:id', deletePatientById);

export default router;