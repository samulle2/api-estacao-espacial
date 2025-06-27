import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { autenticar, isAdmin } from '../middleware/auth'; 

const router = Router();
const prisma = new PrismaClient();


router.use(autenticar);


router.get('/', async (req, res) => {
  const missoes = await prisma.missao.findMany({
    include: { modulos: true } 
  });
  res.json(missoes);
});


router.post('/', async (req, res) => {
  const novaMissao = await prisma.missao.create({
    data: req.body
  });
  res.json(novaMissao);
});


router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const missaoAtualizada = await prisma.missao.update({
    where: { id },
    data: req.body
  });
  res.json(missaoAtualizada);
});


router.delete('/:id', isAdmin, async (req, res) => { 
  const id = Number(req.params.id);
  await prisma.missao.delete({ where: { id } });
  res.sendStatus(204);
});

export default router;