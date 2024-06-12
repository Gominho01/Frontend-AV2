import React, { useState, useEffect } from 'react';
import api from '../services/api';
import "../styles/styles_solicitacao.css";

const CarrinhoSolicitacao = ({ userLogin }) => {
  const [servicos, setServicos] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await api.get('/api/servicos');
        setServicos(response.data);
      } catch (error) {
        setMensagem('Erro ao carregar serviços');
      }
    };

    const fetchSolicitacoes = async () => {
      try {
        const response = await api.get(`/api/solicitacoes/${userLogin}`);
        setSolicitacoes(response.data);
      } catch (error) {
        setMensagem('Erro ao carregar solicitações');
      }
    };

    fetchServicos();
    fetchSolicitacoes();
  }, [userLogin]);

  const handleAtualizarSolicitacoes = async () => {
    try {
      const response = await api.put(`/api/solicitacoes/${userLogin}`, { solicitacoes });
      setMensagem(response.data.message);
    } catch (error) {
      setMensagem('Erro ao atualizar solicitações');
    }
  };

  const handleAdicionarSolicitacao = async (servicoId) => {
    try {
      const response = await api.post('/api/solicitacoes', {
        email: userLogin, // Assuming userLogin is the email
        servicoId,
        estado: 'Em Elaboração',
      });
      setSolicitacoes([...solicitacoes, response.data]);
    } catch (error) {
      setMensagem('Erro ao adicionar solicitação');
    }
  };

  return (
    <div className="carrinho-solicitacao-container">
      <h1>Carrinho de Solicitação de Serviços</h1>
      <div>
        <h2>Serviços Disponíveis</h2>
        <ul>
          {servicos.map(servico => (
            <li key={servico.id}>
              {servico.nome} - R$ {servico.preco.toFixed(2)}
              <button onClick={() => handleAdicionarSolicitacao(servico.id)}>Adicionar Solicitação</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Suas Solicitações</h2>
        <ul>
          {solicitacoes.map((solicitacao, index) => (
            <li key={index}>
              Serviço: {solicitacao.servico.nome}, Status: {solicitacao.Estado}, Data Prevista: {new Date(solicitacao.dataPrevista).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
      <div className="button-group">
        <button onClick={handleAtualizarSolicitacoes}>Atualizar Solicitações</button>
      </div>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default CarrinhoSolicitacao;
