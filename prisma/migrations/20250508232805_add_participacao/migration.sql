-- CreateTable
CREATE TABLE "Participacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "astronautaId" INTEGER NOT NULL,
    "missaoId" INTEGER NOT NULL,
    CONSTRAINT "Participacao_astronautaId_fkey" FOREIGN KEY ("astronautaId") REFERENCES "Astronauta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Participacao_missaoId_fkey" FOREIGN KEY ("missaoId") REFERENCES "Missao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Participacao_astronautaId_missaoId_key" ON "Participacao"("astronautaId", "missaoId");
