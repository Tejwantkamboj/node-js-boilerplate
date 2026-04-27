import Redis from 'ioredis';
import config from '../config/config.js';

class RedisManager {
  constructor() {
    if (!RedisManager.instance) {
      this.client = new Redis({
        host: config.redis.host || '127.0.0.1',
        port: config.redis.port || 6379,
        password: config.redis.password,
        // Exponential backoff strategy
        retryStrategy: (times) => Math.min(times * 50, 2000),
        commandTimeout: 5000,
      });

      this.client.on('connect', () => console.log('✅ Redis Connected'));
      this.client.on('error', (err) => console.error('❌ Redis Error:', err));

      RedisManager.instance = this.client;
    }
  }

  getInstance() {
    return RedisManager.instance;
  }
}

const redis = new RedisManager().getInstance();
export default redis;
