import sequelize from '../../config/database.js';
import User from './User.js';
import UserProfile from './UserProfile.js';

// Khai báo các mối quan hệ (Associations)
User.hasOne(UserProfile, { foreignKey: 'userId', as: 'profile', onDelete: 'CASCADE' });
UserProfile.belongsTo(User, { foreignKey: 'userId' });

export { sequelize, User, UserProfile };
