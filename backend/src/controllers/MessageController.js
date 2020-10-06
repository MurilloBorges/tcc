import * as Yup from 'yup';
import Message from '../models/Message';

class MessageController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        chatId: Yup.objectId().required(),
        message: Yup.string()
          .required()
          .min(1),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ error: 'Validações dos campos incorreta' });
      }

      const { _id } = await Message.create({
        user: req.userId,
        chat: req.body.chatId,
        message: req.body.message,
      });

      return res.status(201).json({
        message: {
          _id,
        },
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new MessageController();
