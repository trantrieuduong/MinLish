import { successResponse } from '../../utils/response.js';
import * as service from './lesson.service.js';

export const getSegments = async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    const segments = await service.getSegmentsByLessonId(lessonId);
    return res
      .status(200)
      .json(successResponse('Lấy segments thành công', segments));
  } catch (err) {
    next(err);
  }
};
