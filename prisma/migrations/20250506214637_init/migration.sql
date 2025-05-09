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
