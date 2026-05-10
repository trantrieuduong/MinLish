import bcrypt from 'bcrypt';
import AppError from '../../utils/AppError.js';
import { User, UserProfile } from '../../models/mysql/index.js';
import { generateToken } from '../../utils/jwt.js';
import { config } from '../../config/env.js';

export const loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ 
    where: { email },
    include: [{ model: UserProfile, as: 'profile' }] 
  });

  if (!user) {
    throw new AppError('Email hoặc mật khẩu không chính xác', 401);
  }

  if (user.status !== 'ACTIVE') {
    throw new AppError('Tài khoản của bạn đã bị khóa hoặc chưa kích hoạt', 403);
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new AppError('Email hoặc mật khẩu không chính xác', 401);
  }

  const payload = {
    id: user.id,
    role: user.role,
    email: user.email,
    username: user.username
  };

  const accessToken = generateToken({ ...payload, type: 'ACCESS' }, config.jwtAccessExpiresIn);
  const refreshToken = generateToken({ ...payload, type: 'REFRESH' }, config.jwtRefreshExpiresIn);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      profile: user.profile
    }
  };
};

export const registerUser = async (data) => {
  // Skeleton for future use
  return {};
};
