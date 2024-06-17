const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const lerServicos = async (req, res) => {
    try {
      const servicos = await prisma.servicoTI.findMany();
      res.status(200).json(servicos);
    } catch (error) {
      console.error('Erro ao ler serviços:', error);
      res.status(500).json({ message: 'Erro ao ler serviços' });
    }
  };
  
  const criarServico = async (req, res) => {
    try {
      const { nome, preco, prazo } = req.body;
  
      if (!nome || !preco || !prazo) {
        return res.status(400).json({ error: 'Nome, preço e prazo são obrigatórios' });
      }
  
      const novoServico = await prisma.servicoTI.create({
        data: {
          nome: nome,
          preco: parseFloat(preco),
          prazo: parseInt(prazo, 10),
        },
      });
  
      res.status(201).json(novoServico);
    } catch (error) {
      console.error('Erro ao criar serviço:', error);
      res.status(500).json({ error: 'Erro ao criar serviço' });
    }
  };

  module.exports = {
    lerServicos,
    criarServico,
  };