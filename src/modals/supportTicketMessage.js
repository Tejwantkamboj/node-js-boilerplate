import mongoose from 'mongoose';
import { paginate } from './plugin/index.js';

const schema = new mongoose.Schema(
  {
    from: {
      enum: ['admin', 'user'],
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SupportTicket',
    },
  },
  { timestamps: true },
);

schema.plugin(paginate);
const SupportTicketMessage = mongoose.model('SupportTicketMessage', schema);
export default SupportTicketMessage;
