import mongoose, { Schema, model } from 'mongoose';

const ChatSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model('Chat', ChatSchema);
