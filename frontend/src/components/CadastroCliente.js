// CadastroCliente.js
import React, { useState } from 'react';
import api from '../services/api';
import "./styles/cadastro.css"

const CadastroCliente = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmPassword: '',
    cpf: '',
    telefone: '',
    nascimento: '',
    estadoCivil: 'SOLTEIRO',
    escolaridade: '2o-grau-completo'
  });
  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, estadoCivil: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, email, senha, confirmPassword, cpf, telefone, nascimento, estadoCivil, escolaridade } = formData;

    if (senha !== confirmPassword) {
      setMensagem('As senhas não coincidem');
      return;
    }

    try {
      const response = await api.post('/api/clientes', { nome, email, senha, cpf, telefone, nascimento, estadoCivil, escolaridade });
      setMensagem(response.data.message);
    } catch (error) {
      setMensagem(error.response?.data?.message || 'Erro ao cadastrar cliente');
    }
  };

  return (
    <div className="cadastro-cliente-container-wrapper">
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
          <div className="input-group">
            <label>Estado Civil</label>
            <div>
              <input type="radio" id="solteiro" name="estadoCivil" value="SOLTEIRO" checked={formData.estadoCivil === 'SOLTEIRO'} onChange={handleRadioChange} />
              <label htmlFor="solteiro">Solteiro(a)</label>
            </div>
            <div>
              <input type="radio" id="casado" name="estadoCivil" value="CASADO" checked={formData.estadoCivil === 'CASADO'} onChange={handleRadioChange} />
              <label htmlFor="casado">Casado(a)</label>
            </div>
            <div>
              <input type="radio" id="divorciado" name="estadoCivil" value="DIVORCIADO" checked={formData.estadoCivil === 'DIVORCIADO'} onChange={handleRadioChange} />
              <label htmlFor="divorciado">Divorciado(a)</label>
            </div>
            <div>
              <input type="radio" id="viuvo" name="estadoCivil" value="VIUVO" checked={formData.estadoCivil === 'VIUVO'} onChange={handleRadioChange} />
              <label htmlFor="viuvo">Viúvo(a)</label>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="escolaridade">Escolaridade:</label>
            <select id="escolaridade" name="escolaridade" value={formData.escolaridade} onChange={handleChange}>
              <option value="1o-grau-incompleto">1º Grau Incompleto</option>
              <option value="1o-grau-completo">1º Grau Completo</option>
              <option value="2o-grau-completo">2º Grau Completo</option>
              <option value="nivel-superior">Nível Superior</option>
              <option value="pos-graduado">Pós-Graduado</option>
            </select>
          </div>
          <div className="button-group">
            <button type="submit">Cadastrar</button>
          </div>
        </form>
        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
};

export default CadastroCliente;