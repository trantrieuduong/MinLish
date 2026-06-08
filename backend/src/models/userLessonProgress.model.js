import mongoose from 'mongoose';

const userLessonProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
    },
    status: {
      type: String,
      enum: ['in_progress', 'completed'],
      default: 'in_progress',
    },
    progressPct: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    lastSegmentOrder: {
      type: Number,
      default: 0,
    },
    selectedMode: {
      type: String,
      enum: ['dictation', 'shadowing'],
      default: 'dictation',
    },
  },
  {
    timestamps: true,
  }
);

userLessonProgressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

export default mongoose.model('UserLessonProgress', userLessonProgressSchema);