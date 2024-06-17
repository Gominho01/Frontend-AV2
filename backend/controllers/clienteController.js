const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { z } = require('zod');

const senhaValida = (senha) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(senha);
};

const formatoCpfValido = (cpf) => {
  const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return regex.test(cpf);
};

const cpfValido = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

const calcularIdade = (nascimento) => {
  const hoje = new Date();
  const nascimentoDate = new Date(nascimento);
  let idade = hoje.getFullYear() - nascimentoDate.getFullYear();
  const mes = hoje.getMonth() - nascimentoDate.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimentoDate.getDate())) {
    idade--;
  }

  return idade;
};

const clienteSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().refine(senhaValida, "A senha deve conter pelo menos 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial."),
  cpf: z.string().refine(formatoCpfValido, "O CPF deve ter a máscara no formato NNN.NNN.NNN-NN.").refine(cpfValido, "O CPF fornecido é inválido."),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  nascimento: z.string().refine((nascimento) => calcularIdade(nascimento) >= 18, "Cliente deve ter pelo menos 18 anos para se cadastrar."),
  estadoCivil: z.string().min(1, "Estado Civil é obrigatório"),
});

const buscarTodosClientes = async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.status(200).json({ clientes });
  } catch (error) {
    console.error("Erro ao buscar todos os clientes:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const buscarClientePorEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { email },
    });

    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    res.status(200).json({ cliente });
  } catch (error) {
    console.error("Erro ao buscar cliente por email:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const trocarSenhaSchema = z.object({
  login: z.string().email("Email inválido"),
  novaSenha: z.string().refine(senhaValida, "A nova senha deve conter pelo menos 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial."),
  senhaAtual: z.string().min(1, "Senha atual é obrigatória"),
});

const trocarSenha = async (req, res) => {
  const { login, novaSenha, senhaAtual } = req.body;

  try {
    trocarSenhaSchema.parse({ login, novaSenha, senhaAtual });

    const cliente = await prisma.cliente.findUnique({
      where: { email: login }
    });

    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    const senhaCorreta = senhaAtual === cliente.senha;
    if (!senhaCorreta) {
      return res.status(401).json({ message: "Senha atual incorreta" });
    }

    await prisma.cliente.update({
      where: { email: login },
      data: { senha: novaSenha }
    });

    res.status(200).json({ message: "Senha atualizada com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors.map(err => err.message).join(", ") });
    }
    console.error("Erro ao trocar senha:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const cadastrarCliente = async (req, res) => {
  const { nome, email, senha, cpf, telefone, nascimento, estadoCivil } = req.body;

  try {
    clienteSchema.parse({ nome, email, senha, cpf, telefone, nascimento, estadoCivil });

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
        nascimento: new Date(nascimento),
        estadoCivil
      }
    });
    
    res.status(201).json({ message: "Cliente cadastrado com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors.map(err => err.message).join(", ") });
    }
    console.error('Erro ao cadastrar cliente:', error);

    if (error.meta && error.meta.target && error.meta.target.includes('email')) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }

    res.status(500).json({ message: "Erro ao cadastrar cliente" });
  }
};

module.exports = { buscarTodosClientes, trocarSenha, cadastrarCliente, buscarClientePorEmail };
