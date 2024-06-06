import React, { useState } from 'react';
import api from '../services/api';

const CadastroServico = () => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: ''
  });
  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, descricao, preco } = formData;

    try {
      const response = await api.post('/servico', { nome, descricao, preco });
      setMensagem(response.data.message);
    } catch (error) {
      setMensagem('Erro ao cadastrar serviço');
    }
  };

  return (
    <div className="cadastro-servico-container">
      <h1>Cadastro de Serviço</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" value={formData.nome} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="descricao">Descrição</label>
          <input type="text" id="descricao" value={formData.descricao} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="preco">Preço</label>
          <input type="text" id="preco" value={formData.preco} onChange={handleChange} />
        </div>
        <div className="button-group">
          <button type="submit">Cadastrar</button>
        </div>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default CadastroServico;
