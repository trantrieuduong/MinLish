import { User, UserProfile } from '../../models/mysql/index.js';
import AppError from '../../utils/AppError.js';

export const getUserProfile = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['passwordHash'] },
    include: [{ model: UserProfile, as: 'profile' }]
  });

  if (!user) {
    throw new AppError('Không tìm thấy người dùng', 404);
  }

  return user;
};
