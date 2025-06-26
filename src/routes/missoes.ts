import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { autenticar, isAdmin } from '../middleware/auth'; // Importe os middlewares

const router = Router();
const prisma = new PrismaClient();

// Aplicar autenticação a todas as rotas deste router
router.use(autenticar);

// GET - Listar todas as missões
router.get('/', async (req, res) => {
  const missoes = await prisma.missao.findMany({
    include: { modulos: true } // inclui os módulos relacionados
  });
  res.json(missoes);
});

// POST - Criar uma nova missão
router.post('/', async (req, res) => {
  const novaMissao = await prisma.missao.create({
    data: req.body
  });
  res.json(novaMissao);
});

// PUT - Atualizar uma missão
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const missaoAtualizada = await prisma.missao.update({
    where: { id },
    data: req.body
  });
  res.json(missaoAtualizada);
});

// DELETE - Remover uma missão: apenas admin
router.delete('/:id', isAdmin, async (req, res) => { // Adicione isAdmin
  const id = Number(req.params.id);
  await prisma.missao.delete({ where: { id } });
  res.sendStatus(204);
});

export default router;