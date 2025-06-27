import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { gerarToken, hashSenha, compararSenhas } from '../utils/authUtils';
import bcrypt from 'bcryptjs';

const router = Router();
const prisma = new PrismaClient();


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

    const { senha: _, ...usuarioSemSenha } = usuario;

    res.status(201).json(usuarioSemSenha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar usuário.' });
  }
});


router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
  }

  try {
    console.log(`\n--- NOVA TENTATIVA DE LOGIN ---`);
    console.log(`Email: ${email}`);
    
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    
    if (!usuario) {
      console.log('❌ Usuário não encontrado');
      return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }

    console.log(`Usuário encontrado: ${usuario.nome}`);
    console.log(`Hash no banco: ${usuario.senha}`);
    console.log(`Tipo do hash: ${usuario.senha.substring(0, 4)}`);
    
    const testeDireto = await bcrypt.compare(senha, usuario.senha);
    console.log(`Teste direto com bcrypt.compare: ${testeDireto}`);
    
    const senhaValida = await compararSenhas(senha, usuario.senha);
    console.log(`Teste com compararSenhas: ${senhaValida}`);
    
    if (!senhaValida) {
      console.log('❌ Senha inválida');
      return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }

    const token = gerarToken(usuario);
    const { senha: _, ...usuarioSemSenha } = usuario;

    console.log('✅ Login bem sucedido!');
    res.json({ usuario: usuarioSemSenha, token });
  } catch (error) {
    console.error('🔥 ERRO NO LOGIN:', error);
    res.status(500).json({ erro: 'Erro ao fazer login.' });
  }
});

export default router;