import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { generateToken } from './AuthenticateController';
import { isEmpty } from '../helpers/funcoes';

class UserController {
  async index(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findById(req.params.id);

      if (isEmpty(user)) {
        return res.status(404).json();
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        photo: Yup.string(),
        cellphone: Yup.string(),
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .required()
          .min(6),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ error: 'Validações dos campos incorreta' });
      }

      const ExistsUser = await User.findOne({ email: req.body.email });

      if (ExistsUser) {
        return res
          .status(400)
          .json({ error: 'Já existe uma conta vinculada a este e-mail' });
      }

      const { _id, name, photo, cellphone, email } = await User.create(
        req.body
      );

      return res.status(201).json({
        user: {
          _id,
          name,
          photo,
          cellphone,
          email,
        },
        token: generateToken({ id: _id }),
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        photo: Yup.string(),
        cellphone: Yup.string(),
        oldPassword: Yup.string().min(6),
        password: Yup.string()
          .min(6)
          .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: Yup.string(6).when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ error: 'Validações dos campos incorreta' });
      }

      const { oldPassword, name, cellphone, photo, password } = req.body;

      const user = await User.findById(req.params.id).select('+password');

      if (isEmpty(user)) {
        return res.status(404).json();
      }

      if (oldPassword && !(await bcrypt.compare(oldPassword, user.password))) {
        return res.status(400).json({ error: 'passwords não correspondem' });
      }

      await User.findByIdAndUpdate(req.params.id, {
        name,
        cellphone,
        photo,
        password,
      });

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      if (isEmpty(user)) {
        return res.status(404).json();
      }

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new UserController();
