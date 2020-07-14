import { Router } from 'express';

import Usuario from './controllers/Usuario';
// import Sessao from './controllers/Sessao';
// import Feed from './controllers/Feed';
import authMiddleware from './middlewares/auth';

const routes = new Router();

routes.get('/usuarios', Usuario.index);
routes.get('/usuarios/:id', Usuario.show);
routes.post('/usuarios', Usuario.store);
routes.delete('/usuarios/:id', Usuario.delete);

// routes.post('/sessoes', Sessao.store);

// // validação de jwt ficara aqui
// routes.put('/usuarios', Usuario.update);

// Feeds
// routes.get('/feeds', Feed.index);
// routes.get('/feeds/:id', Feed.show);
// routes.post('/feeds', Feed.store);
// routes.patch('/feeds/:id', Feed.update);
// routes.delete('/feeds/:id', Feed.delete);

routes.use(authMiddleware);

export default routes;
