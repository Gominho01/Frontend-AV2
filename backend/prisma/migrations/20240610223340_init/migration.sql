/*
  Warnings:

  - You are about to drop the column `descricao` on the `ServicoTI` table. All the data in the column will be lost.
  - Added the required column `prazo` to the `ServicoTI` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preco` to the `ServicoTI` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ServicoTI" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" INTEGER NOT NULL,
    "prazo" INTEGER NOT NULL
);
INSERT INTO "new_ServicoTI" ("id", "nome") SELECT "id", "nome" FROM "ServicoTI";
DROP TABLE "ServicoTI";
ALTER TABLE "new_ServicoTI" RENAME TO "ServicoTI";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
