import mongoose from 'mongoose';
import config from './config.js';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(config.mongoose.url);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
