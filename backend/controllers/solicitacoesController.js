// solicitacoesServicoTIController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const lerSolicitacoes = async (req, res) => {
  const { email } = req.params;
  try {
    const usuario = await prisma.cliente.findUnique({
      where: { email },
      include: { solicitacoesServicoTI: true }
    });
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json({ solicitacoesServicoTI: usuario.solicitacoesServicoTI });
  } catch (error) {
    console.error("Erro ao ler solicitações por usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const atualizarSolicitacoes = async (req, res) => {
  const { email } = req.params;
  const { solicitacoes } = req.body;
  try {
    const usuario = await prisma.cliente.findUnique({
      where: { email }
    });
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    await prisma.cliente.update({
      where: { email },
      data: {
        solicitacoesServicoTI: {
          deleteMany: {},
          create: solicitacoes
        }
      }
    });
    res.status(200).json({ message: "Solicitações atualizadas com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar solicitações por usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = { lerSolicitacoes, atualizarSolicitacoes };
