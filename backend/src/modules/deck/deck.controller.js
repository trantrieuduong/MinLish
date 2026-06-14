import { successResponse } from '../../utils/response.js';
import AppError from '../../utils/AppError.js';
import { listDecksSchema } from './deck.validator.js';
import * as service from './deck.service.js';

export const listDecks = async (req, res, next) => {
  try {
    const result = listDecksSchema.safeParse(req.query);
    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      return next(new AppError('Dữ liệu không hợp lệ', 400, errors));
    }

    const userId = req.user?.id ?? null;
    const data = await service.listDecks(result.data, userId);

    return res
      .status(200)
      .json(successResponse('Lấy danh sách deck thành công.', data));
  } catch (error) {
    next(error);
  }
};
