import * as Yup from 'yup';
import Usuario from '../models/Usuario';

class UsuarioController {
  async index(req, res) {
    try {
      const usuarios = await Usuario.find();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async show(req, res) {
    try {
      const usuario = await Usuario.findById(req.params.id);
      if (usuario.length === 0) {
        return res.status(404).json([]);
      }
      return res.json(usuario);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string().required(),
        foto: Yup.string(),
        celular: Yup.string(),
        email: Yup.string()
          .email()
          .required(),
        senha: Yup.string()
          .required()
          .min(6),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ error: 'Validações dos campos incorreta' });
      }

      const usuarioExistente = await Usuario.findOne({ email: req.body.email });

      if (usuarioExistente) {
        return res.status(400).json({ error: 'Usuario existente' });
      }

      const { _id, nome, foto, celular, email } = await Usuario.create(
        req.body
      );

      return res.json({ _id, nome, foto, celular, email });
    } catch (error) {
      return res.status(500).json({ error });
    }
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

  async delete(req, res) {
    try {
      const usuario = await Usuario.findByIdAndDelete(req.params.id);
      if (usuario.length === 0) {
        return res.status(404).json([]);
      }
      return res.json(usuario);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new UsuarioController();
