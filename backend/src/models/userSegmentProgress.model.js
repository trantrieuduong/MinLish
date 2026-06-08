import mongoose from "mongoose";

const userSegmentProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
    segmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LessonSegment",
      required: true,
    },
    dictation: {
      attemptCount: { type: Number, default: 0 },
      bestScore: { type: Number, default: 0 },
      completed: { type: Boolean, default: false },
      hintUsedCount: { type: Number, default: 0 },
    },
    shadowing: {
      attemptCount: { type: Number, default: 0 },
      bestOverallScore: { type: Number, default: 0 },
      latestAudioUrl: { type: String, default: "" },
      completed: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  },
);

userSegmentProgressSchema.index({ userId: 1, segmentId: 1 }, { unique: true });
userSegmentProgressSchema.index({ userId: 1, lessonId: 1 });

export default mongoose.model("UserSegmentProgress", userSegmentProgressSchema);
