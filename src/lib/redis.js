import Redis from 'ioredis';
import config from './config.js';

const redis = new Redis({
  host: config.redis.host || '127.0.0.1',
  port: config.redis.port || 6379,
  password: config.redis.password,
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  lazyConnect: true,

  retryStrategy: (times) => Math.min(times * 50, 2000),

  reconnectOnError: (err) => {
    const targetErrors = ['READONLY', 'ETIMEDOUT', 'ECONNRESET'];
    return targetErrors.some((e) => err.message.includes(e));
  },
});

// Events
redis.on('connect', () => console.log('✅ Redis Connected'));
redis.on('error', (err) => console.error('❌ Redis Error:', err.message));

export default redis;
