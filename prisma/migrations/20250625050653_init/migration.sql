-- CreateTable
CREATE TABLE "Participacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "astronautaId" INTEGER NOT NULL,
    "missaoId" INTEGER NOT NULL,
    CONSTRAINT "Participacao_astronautaId_fkey" FOREIGN KEY ("astronautaId") REFERENCES "Astronauta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Participacao_missaoId_fkey" FOREIGN KEY ("missaoId") REFERENCES "Missao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Astronauta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Missao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "data_inicio" DATETIME NOT NULL,
    "data_fim" DATETIME NOT NULL,
    "descricao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Modulo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    "missao_id" INTEGER NOT NULL,
    CONSTRAINT "Modulo_missao_id_fkey" FOREIGN KEY ("missao_id") REFERENCES "Missao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Participacao_astronautaId_missaoId_key" ON "Participacao"("astronautaId", "missaoId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
