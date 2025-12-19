import express from 'express';
import { login, register, getProfile, logoutUser } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/profile', protect, getProfile);
router.post('/logout', logoutUser);

export default router;