import { Router } from 'express';
import { registerUser, loginUser, updateUser ,getUser,deleteUser } from '../controllers/authController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.put('/update',authenticateJWT,updateUser);
router.get('/:userId', authenticateJWT, getUser);
router.delete('/:userId', authenticateJWT, deleteUser);

export default router;
