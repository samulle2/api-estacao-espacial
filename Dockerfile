FROM node:18-bullseye

WORKDIR /app

# Instala dependências essenciais
RUN apt-get update && apt-get install -y openssl python3 build-essential

# Copia arquivos de dependência
COPY package*.json ./
COPY prisma ./prisma/

# Instala dependências
RUN npm install

# Gera o Prisma Client
RUN npx prisma generate

# Copia o restante do código
COPY . .

# Compila o projeto
RUN npm run build

# Expõe a porta
EXPOSE 3000

# Comando de inicialização
CMD ["sh", "-c", "npm start"]