/*
  Warnings:

  - Added the required column `dataPrevista` to the `SolicitacaoServicoTI` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SolicitacaoServicoTI" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "servicoId" INTEGER NOT NULL,
    "Estado" TEXT NOT NULL,
    "dataPrevista" DATETIME NOT NULL,
    CONSTRAINT "SolicitacaoServicoTI_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SolicitacaoServicoTI_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "ServicoTI" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SolicitacaoServicoTI" ("Estado", "clienteId", "id", "servicoId") SELECT "Estado", "clienteId", "id", "servicoId" FROM "SolicitacaoServicoTI";
DROP TABLE "SolicitacaoServicoTI";
ALTER TABLE "new_SolicitacaoServicoTI" RENAME TO "SolicitacaoServicoTI";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
