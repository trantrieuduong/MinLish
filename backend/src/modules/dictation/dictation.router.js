import { Router } from 'express';
import * as controller from './dictation.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';

const router = Router();

router.patch(
  '/users/me/lessons/:lessonId/segments/:segmentId/progress',
  protect,
  controller.submitSegmentProgress
);

export default router;
