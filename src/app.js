import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use('/v1', routes);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.set('io', io);

// app.listen(config.port, async () => {
//   const conn = await mongoose.connect(config.mongoose.url);
//   console.log(`MongoDB Connected: ${conn.connection.host}`);
//   console.log(`server is listening at port ${config.port}`);
// });

server.listen(config.port, async () => {
  const conn = await mongoose.connect(config.mongoose.url);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
  console.log(`Server running on port ${config.port}`);
});

export { app, server, io };
