-- CreateTable
CREATE TABLE "Participacao" (
    "id" SERIAL NOT NULL,
    "astronautaId" INTEGER NOT NULL,
    "missaoId" INTEGER NOT NULL,

    CONSTRAINT "Participacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Astronauta" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Astronauta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Missao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Missao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modulo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    "missao_id" INTEGER NOT NULL,

    CONSTRAINT "Modulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participacao_astronautaId_missaoId_key" ON "Participacao"("astronautaId", "missaoId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Participacao" ADD CONSTRAINT "Participacao_astronautaId_fkey" FOREIGN KEY ("astronautaId") REFERENCES "Astronauta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participacao" ADD CONSTRAINT "Participacao_missaoId_fkey" FOREIGN KEY ("missaoId") REFERENCES "Missao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modulo" ADD CONSTRAINT "Modulo_missao_id_fkey" FOREIGN KEY ("missao_id") REFERENCES "Missao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
