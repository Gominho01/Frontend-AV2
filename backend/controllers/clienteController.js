const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

// Função para calcular idade a partir da data de nascimento
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

const trocarSenha = async (req, res) => {
  const { login, novaSenha, senhaAtual } = req.body;

  if (!senhaValida(novaSenha)) {
    return res.status(400).json({ message: 'A nova senha deve conter pelo menos 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial.' });
  }

  try {
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
    console.error("Erro ao trocar senha:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const cadastrarCliente = async (req, res) => {
  const { nome, email, senha, cpf, telefone, nascimento, estadoCivil } = req.body;

  // Validação da senha
  if (!senhaValida(senha)) {
    return res.status(400).json({ message: 'A senha deve conter pelo menos 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial.' });
  }

  // Validação do formato do CPF
  if (!formatoCpfValido(cpf)) {
    return res.status(400).json({ message: 'O CPF deve ter a máscara no formato NNN.NNN.NNN-NN.' });
  }

  // Validação do CPF usando o algoritmo
  if (!cpfValido(cpf)) {
    return res.status(400).json({ message: 'O CPF fornecido é inválido.' });
  }

  // Validação da idade
  const idade = calcularIdade(nascimento);
  if (idade < 18) {
    return res.status(400).json({ message: 'Cliente deve ter pelo menos 18 anos para se cadastrar.' });
  }

  try {
    // Verificação se o cliente já existe
    const clienteExistente = await prisma.cliente.findUnique({ where: { email } });

    if (clienteExistente) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    // Criação do cliente
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

    // Diferenciação de erros específicos
    if (error.meta && error.meta.target && error.meta.target.includes('email')) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }

    res.status(500).json({ message: "Erro ao cadastrar cliente" });
  }
};

module.exports = { buscarTodosClientes, trocarSenha, cadastrarCliente, buscarClientePorEmail };
