import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import routes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import swaggerRoutes from './routes/swagger.js';

const app = express();
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerRoutes));
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

server.listen(config.port, async () => {
  await mongoose.connect(config.mongoose.url);
  console.log(`MongoDB Connected 🔑 `);
  console.log(`Server running on port 👥 ${config.port}`);
});

export { app, server, io };
