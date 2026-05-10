import { Router } from 'express';
import { register, login, refreshToken, verifyOtp } from './auth.controller.js';
import validate from '../../middlewares/validate.middleware.js';
import { loginSchema, registerSchema, verifyOtpSchema } from './auth.schema.js';
import rateLimit from 'express-rate-limit';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too Many Requests', errors: [] }
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { success: false, message: 'Too Many Requests', errors: [] }
});

router.post('/register', registerLimiter, validate(registerSchema), register);
router.post('/verify-otp', validate(verifyOtpSchema), verifyOtp);
router.post('/login', loginLimiter, validate(loginSchema), login);
router.post('/refresh', refreshToken);


export default router;
