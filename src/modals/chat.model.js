import mongoose from 'mongoose';
import { paginate } from './plugin/index.js';

const schema = new mongoose.Schema(
  {
    participants: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      ],
      validate: {
        validator: function (value) {
          return value.length === 2;
        },
        message: 'Chat must have exactly 2 participants',
      },
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    deletedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
);

schema.plugin(paginate);
const Chat = mongoose.model('Chat', schema);
export default Chat;
