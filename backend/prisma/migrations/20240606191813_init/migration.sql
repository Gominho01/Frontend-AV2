-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "nascimento" DATETIME NOT NULL,
    "telefone" TEXT NOT NULL,
    "estadoCivil" TEXT NOT NULL DEFAULT 'SOLTEIRO'
);

-- CreateTable
CREATE TABLE "ServicoTI" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SolicitacaoServicoTI" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "servicoId" INTEGER NOT NULL,
    CONSTRAINT "SolicitacaoServicoTI_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SolicitacaoServicoTI_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "ServicoTI" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");
