const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.servicoTI.createMany({
    data: [
      { nome: 'Consultoria', preco: 300, prazo: 7 },
      { nome: 'Manutenção de Rede', preco: 200, prazo: 12 },
      { nome: 'Instalação de Software', preco: 450, prazo: 5 }
    ]
  });
  console.log('Serviços fixos inseridos no banco de dados');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
