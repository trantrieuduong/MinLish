import { Router } from 'express';
import * as controller from './deck.controller.js';
import { protectOptional } from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', protectOptional, controller.listDecks);

export default router;
