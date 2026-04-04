import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const adminAuthMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    if (decoded.role !== 'admin') {
      return res.status(401).json({ error: 'Invalid Token' });
    }

    req.user = { id: decoded.sub, role: decoded.role };

    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid token',
      message: error.message,
    });
  }
};

export default adminAuthMiddleware;
