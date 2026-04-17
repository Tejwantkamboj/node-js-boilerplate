import mongoose from 'mongoose';
import { paginate } from './plugin/index.js';

const schema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SupportTicketMessage',
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

schema.plugin(paginate);
const SupportTicket = mongoose.model('SupportTicket', schema);
export default SupportTicket;
