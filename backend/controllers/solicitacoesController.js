const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const criarSolicitacao = async (req, res) => {
  try {
    const { email, servicoId, estado } = req.body;

    const cliente = await prisma.cliente.findUnique({
      where: { email: email }
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const clienteId = cliente.id;

    const dataAtual = new Date();
    const servico = await prisma.servicoTI.findUnique({
      where: { id: servicoId }
    });

    if (!servico) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }

    const dataPrevista = new Date(dataAtual.getTime() + (servico.prazo * 24 * 60 * 60 * 1000));

    const novaSolicitacao = await prisma.solicitacao.create({
      data: {
        clienteId: clienteId,
        servicoId: servicoId,
        Estado: estado,
        dataPrevista: dataPrevista,
        dataSolicitacao: dataAtual,
      }
    });

    res.json(novaSolicitacao);
  } catch (error) {
    console.error('Erro ao criar solicitação:', error);
    res.status(500).json({ error: 'Erro ao criar solicitação' });
  }
};

const lerSolicitacoes = async (req, res) => {
  const { email } = req.params;

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { email },
      include: { Solicitacao: true },
    });

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    res.status(200).json(cliente.Solicitacao);
  } catch (error) {
    console.error('Erro ao ler solicitações:', error);
    res.status(500).json({ message: 'Erro ao ler solicitações' });
  }
};

const excluirSolicitacao = async (req, res) => {
  const { id } = req.params;

  try {
    // Verifica se a solicitação existe
    const solicitacao = await prisma.solicitacao.findUnique({
      where: { id: parseInt(id) },
    });

    if (!solicitacao) {
      return res.status(404).json({ message: 'Solicitação não encontrada' });
    }

    // Exclui a solicitação
    await prisma.solicitacao.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).end(); // Retorna resposta vazia indicando sucesso
  } catch (error) {
    console.error('Erro ao excluir solicitação:', error);
    res.status(500).json({ message: 'Erro ao excluir solicitação' });
  }
};

module.exports = {
  criarSolicitacao,
  lerSolicitacoes,
  excluirSolicitacao,
};
