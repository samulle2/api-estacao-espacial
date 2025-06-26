import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { autenticar, isAdmin } from '../middleware/auth'; // Importe os middlewares

const router = Router();
const prisma = new PrismaClient();

// Aplicar autenticação a todas as rotas deste router
router.use(autenticar);

// GET - Listar participações
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

// POST - Criar participação
router.post('/', async (req, res) => {
    try {
      // Garantir que os dados sejam enviados como números
      const { astronautaId, missaoId } = req.body;
  
      // Verificar se os dados estão corretos
      if (!astronautaId || !missaoId) {
        return res.status(400).json({ erro: 'astronautaId e missaoId são obrigatórios.' });
      }
  
      // Garantir que os valores sejam números inteiros
      const novoAstronautaId = parseInt(astronautaId, 10);
      const novoMissaoId = parseInt(missaoId, 10);
  
      // Verificar se a conversão para inteiro foi bem-sucedida
      if (isNaN(novoAstronautaId) || isNaN(novoMissaoId)) {
        return res.status(400).json({ erro: 'astronautaId e missaoId devem ser números válidos.' });
      }
  
      // Criar a participação
      const novaParticipacao = await prisma.participacao.create({
        data: {
          astronautaId: novoAstronautaId,
          missaoId: novoMissaoId,
        },
      });
  
      // Retornar a participação criada
      res.json(novaParticipacao);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao criar participação.' });
    }
});

// DELETE - Deletar participação: apenas admin
router.delete('/:id', isAdmin, async (req, res) => { // Adicione isAdmin
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