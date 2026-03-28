import mongoose from 'mongoose';
import { paginate } from './plugin/index.js';

const schema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['text', 'image', 'video', 'file'],
      default: 'text',
    },
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
);

schema.plugin(paginate);
const Message = mongoose.model('Message', schema);
export default Message;
