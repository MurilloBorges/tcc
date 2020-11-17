/* eslint-disable no-underscore-dangle */
import * as Yup from 'yup';
import AssistantV2 from 'ibm-watson/assistant/v2';
import { IamAuthenticator } from 'ibm-watson/auth';
import 'dotenv/config';

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
        version: process.env.WATSON_VERSION,
        authenticator: new IamAuthenticator({
          apikey: process.env.WATSON_APIKEY,
        }),
        serviceUrl: process.env.WATSON_SERVICEURL,
        disableSslVerification: true,
      });

      const response = await assistant.messageStateless({
        assistantId: process.env.WATSON_ASSISTANTID,
        input: {
          message_type: 'text',
          text: req.body.message,
        },
      });

      let outputMessage;

      if (response.status === 200) {
        outputMessage = response.result.output.generic.map(async ({ text }) => {
          const message = await Message.create({
            user: process.env.WATSON_USERID,
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
      console.log(error);
      return res.status(500).json({ error });
    }
  }
}

export default new MessageController();
