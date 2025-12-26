import { Router } from 'express';
import authMiddleware from './middleware/authMiddleware';
import { register, login, deleteProfile } from './controllers/userController';
const router = Router();

router.post('/register', register);

router.post('/login', login);

router.delete('/me', authMiddleware, deleteProfile);

export default router;
