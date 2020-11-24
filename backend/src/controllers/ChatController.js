/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import Chat from '../models/Chat';
import Message from '../models/Message';
import { isEmpty, isNotEmpty } from '../helpers/funcoes';

class ChatController {
  async index(req, res) {
    try {
      const chat = await Chat.findOne({ user: req.userId }).populate(
        'messages'
      );

      if (isEmpty(chat)) {
        const { _id, createdAt, updatedAt, user } = await Chat.create({ user: req.userId });

        return res.status(200).json({
          _id,
          createdAt,
          updatedAt,
          user,
          messages: [],
        });
      }

      const messages = await Message.find({ chat: chat._id }).populate('user');

      return res.json({
        ...chat._doc,
        messages: messages.map(message => ({
          _id: message._id,
          user: {
            _id: message.user._id,
            name: message.user.name,
          },
          message: message.message,
          createdAt: message.createdAt,
        })),
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async show(req, res) {
    try {
      const chat = await Chat.findById(req.params.id).populate('messages');

      if (isEmpty(chat)) {
        return res.status(404).json({ error: 'Conversa não encontrada' });
      }

      const messages = await Message.find({ chat: req.params.id }).populate('user');

      return res.json({
        ...chat._doc,
        messages: messages.map(message => ({
          _id: message._id,
          user: {
            _id: message.user._id,
            name: message.user.name,
          },
          message: message.message,
          createdAt: message.createdAt,
        })),
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async store(req, res) {
    try {
      const chat = await Chat.findOne({ user: req.userId });

      if (isNotEmpty(chat)) {
        return res.status(201).json({
          chat: {
            _id: chat._doc._id,
          },
        });
      }

      const { _id } = await Chat.create({ user: req.userId });

      return res.status(201).json({
        chat: {
          _id,
        },
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new ChatController();
