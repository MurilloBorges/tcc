import * as Yup from 'yup';
import Usuario from '../models/Usuario';

class UsuarioController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      senha: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validacoes dos campos nao esta coerente' });
    }

    const usuarioExistente = await Usuario.findOne({
      where: { email: req.body.email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: 'Usuario já existe' });
    }

    const { id, nome, usuario } = await Usuario.create(req.body);

    return res.json({ id, nome, usuario });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
      senhaAntiga: Yup.string().min(6),
      senha: Yup.string()
        .min(6)
        .when('senhaAntiga', (senhaAntiga, field) =>
          senhaAntiga ? field.required() : field
        ),
      senhaConfirmacao: Yup.string(6).when('senha', (senha, field) =>
        senha ? field.required().oneOf([Yup.ref('senha')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validacoes dos campos nao esta coerente' });
    }

    const { email, senhaAntiga } = req.body;

    const usuario = await Usuario.findByPk(req.idUsuario);

    if (email !== usuario.email) {
      const usuarioExistente = await Usuario.findOne({
        where: { email },
      });

      if (usuarioExistente) {
        return res
          .status(400)
          .json({ error: 'Existe usuario com este e-mail' });
      }
    }

    if (senhaAntiga && !(await usuario.checkPassword(senhaAntiga))) {
      return res.status(401).json({ error: 'Senhas nao correspondem' });
    }

    const { id, nome } = await usuario.update(req.body);

    return res.json({ id, nome, email });
  }
}

export default new UsuarioController();
