import { RateLimiterRedis } from 'rate-limiter-flexible';
import { redisConnection } from './index.js';
import { config } from './index.js';

const rateLimiter = new RateLimiterRedis({
  storeClient: redisConnection,
  keyPrefix: 'rate_limit',
  points: config.rateLimiter.points,
  duration: config.rateLimiter.duration,
});

export default rateLimiter;
