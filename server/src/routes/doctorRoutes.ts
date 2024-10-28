import { Router } from 'express';
import {
    createDoctor,
    getDoctorById,
    getAllDoctors,
    updateDoctorById,
    deleteDoctorById
  } from '../controllers/doctorController';

const router = Router();

router.post('/doctors', createDoctor);
router.get('/doctors/:id', getDoctorById);
router.get('/doctors', getAllDoctors);
router.put('/doctors/:id', updateDoctorById);
router.delete('/doctors/:id', deleteDoctorById);

export default router;