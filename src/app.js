import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import http from 'http';
import { Server } from 'socket.io';
import swaggerRoutes from './routes/swagger.js';
// import rateLimit from 'express-rate-limit';
// import RedisStore from 'rate-limit-redis';
// import Redis from 'ioredis';

const app = express();
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerRoutes));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// const redisClient = new Redis(process.env.REDIS_URL);

// redisClient.on('connect', () => {
//   console.log('✅ Redis connected');
// });

// redisClient.on('error', (err) => {
//   console.error('❌ Redis error:', err);
// });

// const limiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 100,

//   keyGenerator: (req) => req.user?.id || req.ip,

//   store: new RedisStore({
//     sendCommand: (...args) => redisClient.call(...args),
//   }),
// });

// app.set('trust proxy', 1);
// app.use(limiter);
app.use(cors(corsOptions));
app.use('/v1', routes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.set('io', io);
export { app, server, io };
