import { Router } from 'express';
import { protect } from '../../middlewares/auth.middleware.js';
import * as controller from './gamification.controller.js';

const router = Router();

// Module 1 — Streak
router.get('/streak', protect, controller.getStreak);

export default router;
