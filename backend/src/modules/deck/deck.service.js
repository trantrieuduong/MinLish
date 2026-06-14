import mongoose from 'mongoose';
import Deck from '../../models/deck.model.js';
import Topic from '../../models/topic.model.js';
import UserCardState from '../../models/userCardState.model.js';
import AppError from '../../utils/AppError.js';

export const getDeckById = async (deckId, userId) => {
  const accessClause = {
    $or: [{ ownerType: 'system', status: 'published' }, { ownerId: userId }],
  };

  const deck = await Deck.findOne({ _id: deckId, ...accessClause });
  if (!deck) throw new AppError('Không tìm thấy deck', 404);

  return deck;
};

export const getDeckTopics = async (deckId, userId) => {
  // Reuse access check; throws 404 if deck not accessible.
  const deck = await getDeckById(deckId, userId);

  const topics = await Topic.find({ deckId }).sort({ order: 1 });

  // Progress per topic in ONE aggregation. Solve N+1 query problem.
  // "learned" = card the user has any state for. A hidden card still counts.
  // Aggregate does NOT auto-cast strings to ObjectId — cast explicitly.
  const progressRows = await UserCardState.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        deckId: new mongoose.Types.ObjectId(deckId),
      },
    },
    { $group: { _id: '$topicId', learnedCardCount: { $sum: 1 } } },
  ]);

  // Map topicId -> learnedCardCount for O(1) merge.
  const learnedMap = progressRows.reduce((acc, row) => {
    acc[row._id.toString()] = row.learnedCardCount;
    return acc;
  }, {});

  const items = topics.map((topic) => {
    const learnedCardCount = learnedMap[topic._id.toString()] || 0;
    const totalCardCount = topic.cardCount;
    const progressPct =
      totalCardCount > 0
        ? Math.round((learnedCardCount / totalCardCount) * 100)
        : 0;

    return {
      topic,
      userProgress: { learnedCardCount, totalCardCount, progressPct },
    };
  });

  return { deck, topics: items };
};

export const listDecks = async (filters, userId) => {
  const { tagId, cefrLevelId, q, page, limit } = filters;

  // Owner clause: public system decks, plus all of the current user's decks.
  const publicClause = { ownerType: 'system', status: 'published' };
  const ownerClause = userId
    ? { $or: [publicClause, { ownerId: userId }] }
    : publicClause;

  // Filter clause from optional query params.
  const filterClause = {};
  if (tagId) filterClause.tagIds = tagId;
  if (cefrLevelId) filterClause.cefrLevelIds = cefrLevelId;
  if (q) {
    const regex = new RegExp(q, 'i');
    filterClause.$or = [{ title: regex }, { description: regex }];
  }

  // Combine with $and so the owner $or and the q $or don't collide.
  const query = { $and: [ownerClause, filterClause] };

  const skip = (page - 1) * limit;
  const [decks, totalItems] = await Promise.all([
    Deck.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Deck.countDocuments(query),
  ]);

  return {
    decks,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
};
