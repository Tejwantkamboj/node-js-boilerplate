import { rateLimiter } from '../config/index.js';
import { sendResponse } from '../utils/index.js';
import httpStatus from 'http-status';

const apiRateLimiter = async (req, res, next) => {
  console.log('API Rate Limiter Middleware');
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (err) {
    sendResponse(res, httpStatus.TOO_MANY_REQUESTS, false, 'Too Many Requests');
  }
};

export { apiRateLimiter };
