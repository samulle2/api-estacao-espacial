import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { autenticar, isAdmin } from '../middleware/auth'; 

const router = Router();
const prisma = new PrismaClient();


router.use(autenticar);


router.get('/', async (req, res) => {
  const modulos = await prisma.modulo.findMany({
    include: { missao: true } 
  });
  res.json(modulos);
});


router.post('/', async (req, res) => {
  const novoModulo = await prisma.modulo.create({
    data: req.body
  });
  res.json(novoModulo);
});


router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const moduloAtualizado = await prisma.modulo.update({
    where: { id },
    data: req.body
  });
  res.json(moduloAtualizado);
});


router.delete('/:id', isAdmin, async (req, res) => { 
  const id = Number(req.params.id);
  await prisma.modulo.delete({ where: { id } });
  res.sendStatus(204);
});

export default router;