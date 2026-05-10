import { Router } from 'express';
import * as controller from './user.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/profile', protect, controller.getProfile);

export default router;
