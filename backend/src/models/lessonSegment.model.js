import mongoose from 'mongoose';

const lessonSegmentSchema = new mongoose.Schema(
  {
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
      index: true, // query thường xuyên theo lessonId
    },
    order: {
      type: Number,
      required: true,
    },
    startMs: {
      type: Number,
      required: true,
    },
    endMs: {
      type: Number,
      required: true,
    },
    transcript: {
      original: {
        type: String,
        required: true,
      },
      normalized: {
        type: String,
        required: true, // lowercase, bỏ dấu câu - dùng để tính điểm dictation
      },
    },
    translation: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Đảm bảo order không trùng trong cùng 1 lesson
lessonSegmentSchema.index({ lessonId: 1, order: 1 }, { unique: true });

export default mongoose.model('LessonSegment', lessonSegmentSchema);