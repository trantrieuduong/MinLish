import AppError from '../utils/AppError.js';
import client from '../config/redis.js';

export const rateLimiter = ({ windowMs, max, message }) => {
  return async (req, res, next) => {
    if (!client.isOpen) {
      return next();
    }

    const forwarded = req.headers['x-forwarded-for'];
    const rawIp = forwarded
      ? forwarded.split(',')[0].trim()
      : req.ip || req.socket?.remoteAddress || 'unknown';

    const ip =
      rawIp === '::1'
        ? '127.0.0.1'
        : rawIp.startsWith('::ffff:')
          ? rawIp.replace('::ffff:', '')
          : rawIp;

    const path = req.baseUrl ? `${req.baseUrl}${req.path}` : req.path;
    const key = `ratelimit:${path}:${ip}`;

    try {
      const current = await client.incr(key);

      if (current === 1) {
        await client.expire(key, Math.ceil(windowMs / 1000));
      }

      if (current > max) {
        return next(
          new AppError(message || 'Quá nhiều yêu cầu, vui lòng thử lại sau', 429)
        );
      }

      next();
    } catch (error) {
      console.error('Rate limiter error:', error);
      next();
    }
  };
};
