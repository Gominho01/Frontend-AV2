import React, { useState } from 'react';
import api from '../services/api';

const CadastroCliente = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmPassword: '',
    cpf: '',
    telefone: '',
    nascimento: ''
  });
  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, email, senha, confirmPassword, cpf, telefone, nascimento } = formData;

    if (senha !== confirmPassword) {
      setMensagem('As senhas não coincidem');
      return;
    }

    try {
      const response = await api.post('/cliente', { nome, email, senha, cpf, telefone, nascimento });
      setMensagem(response.data.message);
    } catch (error) {
      setMensagem('Erro ao cadastrar cliente');
    }
  };

  return (
    <div className="cadastro-cliente-container">
      <h1>Cadastro de Cliente</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" value={formData.nome} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" value={formData.senha} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirme a Senha</label>
          <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="cpf">CPF</label>
          <input type="text" id="cpf" value={formData.cpf} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="telefone">Telefone</label>
          <input type="text" id="telefone" value={formData.telefone} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="nascimento">Data de Nascimento</label>
          <input type="date" id="nascimento" value={formData.nascimento} onChange={handleChange} />
        </div>
        <div className="button-group">
          <button type="submit">Cadastrar</button>
        </div>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default CadastroCliente;
