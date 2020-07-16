import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UsuarioSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    foto: {
      type: String,
      required: false,
    },
    celular: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    senha: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

UsuarioSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;

  next();
});

module.exports = model('Usuario', UsuarioSchema);
