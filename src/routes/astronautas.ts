import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { autenticar, isAdmin } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Aplicar autenticação a todas as rotas deste router
router.use(autenticar);

router.get('/', async (req, res) => {
  const dados = await prisma.astronauta.findMany();
  res.json(dados);
});

router.post('/', async (req, res) => {
  const novo = await prisma.astronauta.create({ data: req.body });
  res.json(novo);
});

router.put('/:id', async (req, res) => {
  const atualizado = await prisma.astronauta.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });
  res.json(atualizado);
});

// DELETE: apenas admin
router.delete('/:id', isAdmin, async (req, res) => { // Adicione isAdmin
  await prisma.astronauta.delete({ where: { id: Number(req.params.id) } });
  res.sendStatus(204);
});

export default router;