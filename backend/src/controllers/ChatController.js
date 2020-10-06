import Chat from '../models/Chat';
import { isEmpty } from '../helpers/funcoes';

class ChatController {
  async index(req, res) {
    try {
      const chats = await Chat.find().populate('message');
      res.json(chats);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async show(req, res) {
    try {
      const chat = await Chat.findById(req.params.id).populate('message');

      if (isEmpty(chat)) {
        return res.status(404).json({ error: 'Conversa não encontrada' });
      }

      return res.json(chat);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async store(req, res) {
    try {
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
