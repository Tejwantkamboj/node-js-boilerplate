import mongoose from 'mongoose';
import { paginate } from './plugin/index.js';

const schema = new mongoose.Schema(
  {
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

schema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 });
schema.plugin(paginate);
const Notification = mongoose.model('Notification', schema);
export default Notification;
