import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { autenticar } from '../middleware/auth';
import type { Request, Response } from 'express';

const router = Router();
const prisma = new PrismaClient();

router.use(autenticar);

// Função para verificar e obter o usuário autenticado
const getUsuarioAutenticado = (req: Request) => {
  if (!req.usuario) {
    throw new Error('Usuário não autenticado');
  }
  return req.usuario;
};

// Obter perfil do usuário logado
router.get('/perfil', async (req: Request, res: Response) => {
  try {
    const usuarioAutenticado = getUsuarioAutenticado(req);
    
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioAutenticado.id },
      select: { 
        id: true, 
        nome: true, 
        email: true, 
        isAdmin: true, 
        createdAt: true 
      }
    });

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    res.json(usuario);
  } catch (error: any) {
    console.error(error);
    
    if (error.message === 'Usuário não autenticado') {
      return res.status(401).json({ erro: error.message });
    }
    
    res.status(500).json({ erro: 'Erro ao buscar perfil.' });
  }
});

// Atualizar perfil
router.put('/perfil', async (req: Request, res: Response) => {
  try {
    const usuarioAutenticado = getUsuarioAutenticado(req);
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ erro: 'Nome e e-mail são obrigatórios.' });
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: usuarioAutenticado.id },
      data: { nome, email },
      select: { 
        id: true, 
        nome: true, 
        email: true, 
        isAdmin: true, 
        createdAt: true 
      }
    });

    res.json(usuarioAtualizado);
  } catch (error: any) {
    console.error(error);
    
    if (error.message === 'Usuário não autenticado') {
      return res.status(401).json({ erro: error.message });
    }
    
    res.status(500).json({ erro: 'Erro ao atualizar perfil.' });
  }
});

export default router;