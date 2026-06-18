import { successResponse } from '../../utils/response.js';
import * as service from './gamification.service.js';
import { getDayKey } from '../../config/gamification.config.js';

export const getStreak = async (req, res, next) => {
  try {
    const profile = await service.getProfile(req.user.id);
    const activeToday = profile.lastActiveDayKey === getDayKey();
    res.json(
      successResponse('Streak fetched', {
        currentStreak: profile.currentStreak,
        longestStreak: profile.longestStreak,
        lastActiveDayKey: profile.lastActiveDayKey,
        activeToday,
      })
    );
  } catch (err) {
    next(err);
  }
};
