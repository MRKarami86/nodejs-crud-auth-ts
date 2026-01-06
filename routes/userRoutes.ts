import { Router } from 'express';
import { userController } from '../injection/injrction';
import authMiddleware from '../middleware/authMiddleware';
const router = Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created
 */
router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/update',authMiddleware, userController.update);
router.delete('/delete',authMiddleware,userController.delete);




export default router;
