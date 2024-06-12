const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const criarSolicitacao = async (req, res) => {
  const { email, clienteId, servicoId, estado } = req.body;

  try {
    // Obter o serviço de TI pelo ID para recuperar o prazo
    const servico = await prisma.servicoTI.findUnique({
      where: { id: servicoId },
    });

    if (!servico) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }

    // Calcular a data prevista
    const dataAtual = new Date();
    const dataPrevista = new Date(dataAtual.getTime() + (servico.prazo * 24 * 60 * 60 * 1000));

    // Criar a solicitação de serviço com a data prevista e o estado
    const novaSolicitacao = await prisma.solicitacao.create({
      data: {
        clienteId, // Incluído clienteId aqui
        servicoId,
        Estado: estado, // Incluído o estado aqui
        dataPrevista: dataPrevista,
      },
    });

    res.status(201).json(novaSolicitacao);
  } catch (error) {
    console.error('Erro ao criar solicitação:', error);
    res.status(500).json({ message: 'Erro ao criar solicitação' });
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

const atualizarSolicitacoes = async (req, res) => {
  const { email } = req.params;
  const { solicitacoes } = req.body;

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { email },
    });

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    for (const solicitacao of solicitacoes) {
      await prisma.solicitacaoS.update({
        where: { id: solicitacao.id },
        data: {
          Estado: solicitacao.Estado,
        },
      });
    }

    res.status(200).json({ message: 'Solicitações atualizadas com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar solicitações:', error);
    res.status(500).json({ message: 'Erro ao atualizar solicitações' });
  }
};

const lerServicos = async (req, res) => {
  try {
    const servicos = await prisma.servicoTI.findMany();
    res.status(200).json(servicos);
  } catch (error) {
    console.error('Erro ao ler serviços:', error);
    res.status(500).json({ message: 'Erro ao ler serviços' });
  }
};

module.exports = {
  criarSolicitacao,
  lerSolicitacoes,
  atualizarSolicitacoes,
  lerServicos,
};
