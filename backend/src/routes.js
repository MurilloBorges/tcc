import { Router } from 'express';

import User from './controllers/UserController';
import Password from './controllers/PasswordController';
import Chat from './controllers/ChatController';
import Message from './controllers/MessageController';
import authMiddleware from './middlewares/auth';
import Authenticate from './controllers/AuthenticateController';

const routes = new Router();

// USUÁRIO
routes.get('/users', User.index);
routes.get('/users/:id', User.show);
routes.post('/users', User.store);

// AUTENTICAÇÃO
routes.post('/authenticate', Authenticate.store);
routes.use(authMiddleware);

// USUÁRIO
routes.delete('/users/:id', User.delete);
routes.patch('/users/:id', User.update);

// SENHA
routes.post('/users/:id/passwords', Password.store);

// CHAT
routes.get('/chats', Chat.index);
routes.get('/chats/:id', Chat.show);
routes.post('/chats', Chat.store);

// MESSAGE
routes.post('/messages', Message.store);

export default routes;
