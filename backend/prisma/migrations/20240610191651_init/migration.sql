-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "nascimento" DATETIME NOT NULL,
    "telefone" TEXT NOT NULL,
    "estadoCivil" TEXT NOT NULL DEFAULT 'SOLTEIRO',
    "escolaridade" TEXT NOT NULL DEFAULT '2o grau completo'
);
INSERT INTO "new_Cliente" ("cpf", "email", "estadoCivil", "id", "nascimento", "nome", "senha", "telefone") SELECT "cpf", "email", "estadoCivil", "id", "nascimento", "nome", "senha", "telefone" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
