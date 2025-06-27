import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

declare module 'express' {
  interface Request {
    usuario?: {
      id: number;
      email: string;
      isAdmin: boolean;
    };
  }
}

export const autenticar = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET) as any;
    req.usuario = decoded; 
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ erro: 'Token inválido.' });
  }
};


export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.usuario?.isAdmin) {
    res.status(403).json({ erro: 'Acesso negado. Requer privilégios de administrador.' });
    return;
  }
  next();
};