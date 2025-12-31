import { Router } from 'express';
import { userController } from '../injection/injrction';
import authMiddleware from '../middleware/authMiddleware';
const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/update',authMiddleware, userController.update);




export default router;
