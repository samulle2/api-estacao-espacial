import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import astronautas from './routes/astronautas';
import missoes from './routes/missoes';
import modulos from './routes/modulos';
import participacoes from './routes/participacoes';
import auth from './routes/auth'; // Importe as rotas de autenticação
import usuario from './routes/usuario'; // Importe as rotas de perfil do usuário

const app = express();
app.use(cors());
app.use(express.json());

// Rotas públicas (autenticação)
app.use('/auth', auth);

// Rotas protegidas
app.use('/astronautas', astronautas);
app.use('/missoes', missoes);
app.use('/modulos', modulos);
app.use('/participacoes', participacoes);
app.use('/usuario', usuario); // Rotas de perfil do usuário

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});