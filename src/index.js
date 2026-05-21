import mongoose from 'mongoose';
import { server } from './app.js';
import config from './config/config.js';
import agenda from './config/agenda.js';
import './workers/auth.email.workers.js';

mongoose
  .connect(config.mongoose.url)
  .then(async () => {
    console.log('Connected to MongoDB');
    await agenda.start();
    console.log('Agenda started');
    server.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
