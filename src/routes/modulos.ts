import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET - Listar todos os módulos
router.get('/', async (req, res) => {
  const modulos = await prisma.modulo.findMany({
    include: { missao: true } // traz dados da missão relacionada
  });
  res.json(modulos);
});

// POST - Criar um novo módulo
router.post('/', async (req, res) => {
  const novoModulo = await prisma.modulo.create({
    data: req.body
  });
  res.json(novoModulo);
});

// PUT - Atualizar módulo
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const moduloAtualizado = await prisma.modulo.update({
    where: { id },
    data: req.body
  });
  res.json(moduloAtualizado);
});

// DELETE - Deletar módulo
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  await prisma.modulo.delete({ where: { id } });
  res.sendStatus(204);
});

export default router;
