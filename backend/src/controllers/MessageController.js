/* eslint-disable no-underscore-dangle */
import * as Yup from 'yup';
import AssistantV2 from 'ibm-watson/assistant/v2';
import { IamAuthenticator } from 'ibm-watson/auth';

import Message from '../models/Message';

class MessageController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        chatId: Yup.string()
          .required()
          .min(24),
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

      const assistant = new AssistantV2({
        version: '2020-22-09',
        authenticator: new IamAuthenticator({
          apikey: 'z6J7PMmI1KjIPdG5woG4VS38L74njNIZeNFXQW9rN4Bw',
        }),
        serviceUrl:
          'https://api.us-south.assistant.watson.cloud.ibm.com/instances/3af0bba2-1a44-4866-b2dc-f7901b0e6b10',
        disableSslVerification: true,
      });

      const response = await assistant.messageStateless({
        assistantId: 'b2f40ded-a26d-4a37-ad01-7d7c0fe2f0e1',
        input: {
          message_type: 'text',
          text: req.body.message,
        },
      });

      let outputMessage;

      if (response.status === 200) {
        outputMessage = response.result.output.generic.map(async ({ text }) => {
          const message = await Message.create({
            user: '5f7baa4e6c68dfbe5dd5992f',
            chat: req.body.chatId,
            message: text,
          });

          return {
            _id: message._doc._id,
            message: text,
          };
        });
      } else {
        return response
          .status(409)
          .json({ error: 'Falha ao enviar a mensagem' });
      }

      const output = await Promise.all(outputMessage);

      return res.status(201).json({
        message: {
          _id,
          output,
        },
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new MessageController();
