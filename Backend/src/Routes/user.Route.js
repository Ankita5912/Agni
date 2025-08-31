import express from 'express';
import { fetchAllUser, fetchById } from '../Controllers/user.controller.js';
import { authenticate } from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.get('/user',authenticate, fetchById);
router.get('/', authenticate, fetchAllUser);

export default router;