import { rateLimiter } from '../config/index.js';

const socketRateLimiter = async (socket, next) => {
  try {
    await rateLimiter.consume(socket.handshake.address);
    next();
  } catch {
    next(new Error('Too many socket requests'));
  }
};

export default socketRateLimiter;
