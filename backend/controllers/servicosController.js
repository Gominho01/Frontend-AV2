// servicosTIController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cadastrarServico = async (req, res) => {
  const { nome, descricao } = req.body;
  try {
    const novoServicoTI = await prisma.servicoTI.create({
      data: { nome, descricao }
    });
    res.status(201).json({ message: "Serviço de TI cadastrado com sucesso", servicoTI: novoServicoTI });
  } catch (error) {
    console.error("Erro ao cadastrar serviço de TI:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const consultarServicos = async (req, res) => {
  try {
    const servicosTI = await prisma.servicoTI.findMany();
    res.status(200).json({ servicosTI });
  } catch (error) {
    console.error("Erro ao consultar serviços de TI:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = { cadastrarServico, consultarServicos};
