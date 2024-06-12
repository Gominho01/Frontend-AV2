/*
  Warnings:

  - Added the required column `dataSolicitacao` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Solicitacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "servicoId" INTEGER NOT NULL,
    "Estado" TEXT NOT NULL,
    "dataPrevista" DATETIME NOT NULL,
    "dataSolicitacao" DATETIME NOT NULL,
    CONSTRAINT "Solicitacao_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Solicitacao_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "ServicoTI" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Solicitacao" ("Estado", "clienteId", "dataPrevista", "id", "servicoId") SELECT "Estado", "clienteId", "dataPrevista", "id", "servicoId" FROM "Solicitacao";
DROP TABLE "Solicitacao";
ALTER TABLE "new_Solicitacao" RENAME TO "Solicitacao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
