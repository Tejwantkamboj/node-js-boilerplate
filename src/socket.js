import { Server } from 'socket.io';

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.emit('connected', {
      message: 'Socket.IO server is ready',
      socketId: socket.id,
    });

    socket.on('disconnect', (reason) => {
      console.log(`Socket disconnected: ${socket.id} (${reason})`);
    });
  });

  return io;
};

const getIo = () => {
  if (!io) {
    throw new Error('Socket.IO has not been initialized yet');
  }

  return io;
};

export { getIo, initializeSocket };
