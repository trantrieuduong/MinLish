import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema(
  {
    deckId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Deck',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    order: {
      type: Number,
      required: true,
      min: 1,
    },
    cardCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

topicSchema.index({ deckId: 1, order: 1 });
topicSchema.index({ deckId: 1, slug: 1 }, { unique: true });

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;
