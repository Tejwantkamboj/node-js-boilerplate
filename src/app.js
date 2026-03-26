import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import routes from './routes/index.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.options('*', cors());

// v1 api routes
app.use('/v1', routes);

console.log('config of env', config.port);
app.listen(config.port, async () => {
  const conn = await mongoose.connect(config.mongoose.url);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
  console.log(`server is listening at port ${config.port}`);
});
