import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { hashSenha, compararSenhas } from './utils/authUtils';
import authRouter from './routes/auth';
import astronautaRouter from './routes/astronautas'; 
import missaoRouter from './routes/missoes';
import moduloRouter from './routes/modulos';
import participacaoRouter from './routes/participacoes';
import usuarioRouter from './routes/usuario';

const prisma = new PrismaClient();
const app = express();

async function setupAdminUser() {
  try {
    const adminEmail = 'admin@admin.com';
    const adminPassword = 'admin123';
    
    let admin = await prisma.usuario.findUnique({
      where: { email: adminEmail },
    });

    if (!admin) {
      const hashedPassword = await hashSenha(adminPassword);
      
      admin = await prisma.usuario.create({
        data: {
          nome: 'Administrador',
          email: adminEmail,
          senha: hashedPassword,
          isAdmin: true,
        },
      });
      console.log('✅ Usuário admin criado com sucesso!');
    } 
    else {
      const senhaCorreta = await compararSenhas(adminPassword, admin.senha);
      
      if (!senhaCorreta) {
        console.log('⚠️ Senha do admin incorreta, atualizando...');
        const newHash = await hashSenha(adminPassword);
        await prisma.usuario.update({
          where: { email: adminEmail },
          data: { senha: newHash },
        });
        console.log('✅ Senha do admin atualizada!');
      } else {
        console.log('ℹ️ Usuário admin já existe com senha correta.');
      }
    }
  } catch (error) {
    console.error('❌ Erro no setup do admin:', error);
  }
}

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/astronautas', astronautaRouter);
app.use('/missoes', missaoRouter);
app.use('/modulos', moduloRouter);
app.use('/participacoes', participacaoRouter);
app.use('/usuarios', usuarioRouter);


async function startServer() {
  try {
    await setupAdminUser();
    
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 API rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('❌ Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();