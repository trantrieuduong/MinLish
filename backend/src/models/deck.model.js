import mongoose from 'mongoose';

const deckSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      default: null,
      trim: true,
      maxlength: 500,
    },
    coverImage: {
      type: String,
      default: null,
      trim: true,
    },
    tagLevelIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TagLevel',
      },
    ],
    tagCategoryIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TagCategory',
      },
    ],
    topicCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    cardCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    ownerType: {
      type: String,
      enum: ['system', 'user'],
      default: 'user',
      index: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
      index: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

deckSchema.index({ title: 'text', description: 'text' });
deckSchema.index({ ownerType: 1, ownerId: 1, status: 1 });

const Deck = mongoose.model('Deck', deckSchema);

export default Deck;
