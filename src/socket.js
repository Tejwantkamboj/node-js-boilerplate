import { io } from '../app.js';
import jwt from 'jsonwebtoken';
import {config} from './config/index.js';
import { User } from '../models/index.js';

const socketAuth = async (socket, next) => {
  const token = socket.handshake.headers?.token;

  if (!token) {
    console.warn('Socket auth failed: No token provided');
    return next(new Error('Unauthorized: No token'));
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);

    const userId = decoded.sub;
    if (!userId) {
      return next(new Error('Unauthorized: Invalid token payload'));
    }
    const user = await User.findById(userId);
    if (!user) {
      return next(new Error('Unauthorized: User not found'));
    }
    socket.user = user;
    next();
  } catch (err) {
    console.error('Socket auth failed:', err.message);
    next(new Error('Unauthorized: Invalid token'));
  }
};

io.use(socketAuth);

// ✅ CONNECTION
io.on('connection', (socket) => {
  console.log('User connected:', socket.user._id);

  // ✅ JOIN USER ROOM (important for chat)
  socket.join(socket.user._id.toString());

  socket.on('message', (msg) => {
    console.log('message:', msg);

    // broadcast example
    io.emit('message', {
      user: socket.user._id,
      text: msg,
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.user._id);
  });
});
