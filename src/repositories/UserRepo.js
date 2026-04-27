import redis from '../lib/redis.js';
import { User } from '../modals/index.js';
import config from '../config/config.js';

export const getUserById = async (userId) => {
  const key = `${config.redis.cachePrefix}:user:${userId}`;

  try {
    // 1. Try Cache
    const cachedData = await redis.hgetall(key);

    // Check if the hash is non-empty
    if (cachedData && Object.keys(cachedData).length > 0) {
      return cachedData;
    }

    // 2. Cache Miss - Hit Database
    const user = await User.findById(userId).lean();
    if (!user) {
      return null;
    }

    // 3. Update Cache using a Pipeline (More efficient for 1M user scale)
    // We convert everything to strings for Redis Hashes
    await redis.pipeline().hset(key, user).expire(key, config.redis.ttl.user).exec();

    return user;
  } catch (error) {
    // If Redis fails, log it but don't crash. Fallback to DB.
    console.error(`Cache error for user ${userId}:`, error);
    return await User.findById(userId).lean();
  }
};
