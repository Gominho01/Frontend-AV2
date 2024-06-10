const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const autenticacao = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { email }
    });
    if (!cliente || cliente.senha !== senha) {
      return res.status(401).json({ message: "Credenciais inválidas", result: false });
    }
    res.status(200).json({ message: "Autenticação bem-sucedida", result: true });
  } catch (error) {
    console.error("Erro durante a autenticação:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

module.exports = { autenticacao };
