import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { gerarToken, hashSenha, compararSenhas } from '../utils/authUtils';

const router = Router();
const prisma = new PrismaClient();

// Registro de usuário
router.post('/registro', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Preencha todos os campos.' });
  }

  try {
    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'E-mail já cadastrado.' });
    }

    const senhaHash = await hashSenha(senha);
    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
      },
    });

    // Não retornar a senha
    const { senha: _, ...usuarioSemSenha } = usuario;

    res.status(201).json(usuarioSemSenha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar usuário.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }

    const senhaValida = await compararSenhas(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }

    const token = gerarToken(usuario);
    const { senha: _, ...usuarioSemSenha } = usuario;

    res.json({ usuario: usuarioSemSenha, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao fazer login.' });
  }
});

export default router;