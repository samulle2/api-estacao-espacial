import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { autenticar, isAdmin } from '../middleware/auth'; 

const router = Router();
const prisma = new PrismaClient();


router.use(autenticar);


router.get('/', async (req, res) => {
  try {
    const participacoes = await prisma.participacao.findMany({
      include: {
        astronauta: true,
        missao: true,
      },
    });
    res.json(participacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao listar participações.' });
  }
});


router.post('/', async (req, res) => {
    try {
      
      const { astronautaId, missaoId } = req.body;
  
      
      if (!astronautaId || !missaoId) {
        return res.status(400).json({ erro: 'astronautaId e missaoId são obrigatórios.' });
      }
  
      
      const novoAstronautaId = parseInt(astronautaId, 10);
      const novoMissaoId = parseInt(missaoId, 10);
  
      
      if (isNaN(novoAstronautaId) || isNaN(novoMissaoId)) {
        return res.status(400).json({ erro: 'astronautaId e missaoId devem ser números válidos.' });
      }
  
      
      const novaParticipacao = await prisma.participacao.create({
        data: {
          astronautaId: novoAstronautaId,
          missaoId: novoMissaoId,
        },
      });
  
      
      res.json(novaParticipacao);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao criar participação.' });
    }
});


router.delete('/:id', isAdmin, async (req, res) => { 
  try {
    await prisma.participacao.delete({
      where: { id: Number(req.params.id) },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao excluir participação.' });
  }
});

export default router;