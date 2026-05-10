import { successResponse } from '../../utils/response.js';
import * as service from './user.service.js';

export const getProfile = async (req, res, next) => {
  try {
    const data = await service.getUserProfile(req.user.id);
    res.status(200).json(successResponse('Lấy thông tin thành công', data));
  } catch (err) {
    next(err);
  }
};
