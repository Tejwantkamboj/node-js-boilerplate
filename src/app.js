import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
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
export { app, server, io };