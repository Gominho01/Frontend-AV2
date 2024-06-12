/*
  Warnings:

  - You are about to drop the `SolicitacaoServicoTI` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SolicitacaoServicoTI";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Solicitacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "servicoId" INTEGER NOT NULL,
    "Estado" TEXT NOT NULL,
    "dataPrevista" DATETIME NOT NULL,
    CONSTRAINT "Solicitacao_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Solicitacao_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "ServicoTI" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
