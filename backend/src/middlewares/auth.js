import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import logger from './logger';
import authConfig from '../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    logger.info('Retorno: Token não fornecido');
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.idUsuario = decoded.id;

    return next();
  } catch (err) {
    logger.error(err).info('Retorno: Token inválido');
    return res.status(401).json({ error: 'Token inválido' });
  }
};
