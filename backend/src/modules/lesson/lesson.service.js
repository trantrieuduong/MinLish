import AppError from "../../utils/AppError.js";
import LessonSegment from "../../models/lessonSegment.model.js";

export const getSegmentsByLessonId = async (lessonId) => {
  const segments = await LessonSegment.find({ lessonId }).sort({ order: 1 });
  if (segments.length == 0) throw new AppError('Không tìm thấy segments', 404);
  return segments;
};