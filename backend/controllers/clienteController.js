// clienteController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const buscarTodosClientes = async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany(); // Consulta todos os clientes no banco de dados
    res.status(200).json({ clientes }); // Retorna os clientes encontrados na resposta
  } catch (error) {
    console.error("Erro ao buscar todos os clientes:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

const trocarSenha = async (req, res) => {
    const { email, senhaAtual, novaSenha } = req.body;
    try {
      const cliente = await prisma.cliente.findUnique({
        where: { email }
      });
      if (!cliente || cliente.senha !== senhaAtual) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }
      await prisma.cliente.update({
        where: { email },
        data: { senha: novaSenha }
      });
      res.status(200).json({ message: "Senha atualizada com sucesso" });
    } catch (error) {
      console.error("Erro ao trocar senha:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
  
  const cadastrarCliente = async (req, res) => {
    const { nome, email, senha, cpf, telefone, nascimento, estadoCivil } = req.body;
  
    try {
      const clienteExistente = await prisma.cliente.findUnique({ where: { email } });
  
      if (clienteExistente) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }
  
      await prisma.cliente.create({
        data: {
          nome,
          email,
          senha,
          cpf,
          telefone,
          nascimento: new Date(nascimento), // Certifique-se de que a data está no formato correto
          estadoCivil
        }
      });
  
      res.status(201).json({ message: "Cliente cadastrado com sucesso" });
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      res.status(500).json({ message: "Erro ao cadastrar cliente" });
    }
  };

module.exports = { buscarTodosClientes, trocarSenha, cadastrarCliente };
