import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const gerarToken = (usuario: { id: number; email: string; isAdmin: boolean }) => {
  return jwt.sign(
    { id: usuario.id, email: usuario.email, isAdmin: usuario.isAdmin },
    SECRET,
    { expiresIn: '1h' }
  );
};

export const verificarToken = (token: string) => {
  return jwt.verify(token, SECRET);
};

export const hashSenha = async (senha: string) => {
  return bcrypt.hash(senha, 10);
};

export const compararSenhas = async (senha: string, hash: string) => {
  const cleanedHash = hash
    .replace(/^\$2y\$/, '$2a$')  
    .replace(/^\$2b\$/, '$2a$'); 

  return bcrypt.compare(senha, cleanedHash);
};