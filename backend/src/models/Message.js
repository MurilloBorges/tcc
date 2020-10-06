import mongoose, { Schema, model } from 'mongoose';

const MessageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Message', MessageSchema);
