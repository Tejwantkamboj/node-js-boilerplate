import mongoose from 'mongoose';
import { server } from './app.js';
import config from './config/config.js';

mongoose
  .connect(config.mongoose.url)
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
