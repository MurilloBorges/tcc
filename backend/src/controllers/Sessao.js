import jwt from 'jsonwebtoken';

import Usuario from '../models/Usuario';
import authConfig from '../config/auth';

class SessionController {
  async store(req, res) {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuario não encontrado' });
    }

    if (!(await usuario.checkPassword(senha))) {
      return res.status(401).json({ error: 'Senhas nao correspondem' });
    }

    const { id, nome } = usuario;

    return res.json({
      usuario: {
        id,
        nome,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
