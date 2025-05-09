import express from 'express';
import cors from 'cors';

import astronautas from './routes/astronautas';
import missoes from './routes/missoes';
import modulos from './routes/modulos';
import participacoes from './routes/participacoes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/astronautas', astronautas);
app.use('/missoes', missoes);
app.use('/modulos', modulos);
app.use('/participacoes', participacoes); 

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
