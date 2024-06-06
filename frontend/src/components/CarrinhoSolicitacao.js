import React, { useState, useEffect } from 'react';
import api from '../services/api';

const CarrinhoSolicitacao = ({ userLogin }) => {
  const [servicos, setServicos] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await api.get('/servico');
        setServicos(response.data.servicos);
      } catch (error) {
        setMensagem('Erro ao carregar serviços');
      }
    };

    const fetchSolicitacoes = async () => {
      try {
        const response = await api.get(`/solicitacao/${userLogin}`);
        setSolicitacoes(response.data.solicitacoes);
      } catch (error) {
        setMensagem('Erro ao carregar solicitações');
      }
    };

    fetchServicos();
    fetchSolicitacoes();
  }, [userLogin]);

  const handleAtualizarSolicitacoes = async () => {
    try {
      const response = await api.put(`/solicitacao/${userLogin}`, { solicitacoes });
      setMensagem(response.data.message);
    } catch (error) {
      setMensagem('Erro ao atualizar solicitações');
    }
  };

  const handleAdicionarSolicitacao = (servicoId) => {
    const servico = servicos.find(s => s.id === servicoId);
    const novaSolicitacao = {
      servicoId: servico.id,
      status: 'Em Elaboração',
      dataPrevista: new Date().toISOString(),
    };
    setSolicitacoes([...solicitacoes, novaSolicitacao]);
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
              <button onClick={() => handleAdicionarSolicitacao(servico.id)}>Adicionar</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Suas Solicitações</h2>
        <ul>
          {solicitacoes.map((solicitacao, index) => (
            <li key={index}>
              Serviço: {solicitacao.servicoId}, Status: {solicitacao.status}, Data Prevista: {new Date(solicitacao.dataPrevista).toLocaleDateString()}
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
