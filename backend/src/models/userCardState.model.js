import mongoose from 'mongoose';

const userCardStateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    cardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card',
      required: true,
      index: true,
    },
    deckId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Deck',
      required: true,
      index: true,
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
      index: true,
    },
    srs: {
      easeFactor: {
        type: Number,
        default: 2.5,
        min: 1.3,
      },
      interval: {
        type: Number,
        default: 0,
      },
      lastGrade: {
        type: String,
        enum: ['Again', 'Hard', 'Good', 'Easy', null],
        default: null,
      },
      nextReviewAt: {
        type: Date,
        default: null,
      },
    },
    lastReviewedAt: {
      type: Date,
      default: null,
    },
    flags: {
      starred: {
        type: Boolean,
        default: false,
      },
      hidden: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userCardStateSchema.index({ userId: 1, cardId: 1 }, { unique: true });
userCardStateSchema.index({ userId: 1, 'srs.nextReviewAt': 1 });

const UserCardState = mongoose.model('UserCardState', userCardStateSchema, 'user_card_states');

export default UserCardState;
