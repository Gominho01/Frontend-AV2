import React, { useState } from 'react';
import api from '../services/api';
import "../styles/styles_servico.css";

const CriarServico = () => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [prazo, setPrazo] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handlePrecoChange = (event) => {
    setPreco(event.target.value);
  };

  const handlePrazoChange = (event) => {
    setPrazo(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/api/criar-servicos', {
        nome,
        preco: parseFloat(preco),
        prazo: parseInt(prazo, 10),
      });
      setMensagem('Serviço criado com sucesso');
      setNome('');
      setPreco('');
      setPrazo('');
    } catch (error) {
      setMensagem('Erro ao criar serviço');
    }
  };

  return (
    <div className="criar-servico-wrapper">
      <div className="criar-servico-container">
        <h1>Criar Novo Serviço</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome do Serviço:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={handleNomeChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="preco">Preço:</label>
            <input
              type="number"
              id="preco"
              value={preco}
              onChange={handlePrecoChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="prazo">Prazo (dias):</label>
            <input
              type="number"
              id="prazo"
              value={prazo}
              onChange={handlePrazoChange}
              required
            />
          </div>
          <button type="submit">Criar Serviço</button>
        </form>
        {mensagem && <p className="mensagem">{mensagem}</p>}
      </div>
    </div>
  );
};

export default CriarServico;
