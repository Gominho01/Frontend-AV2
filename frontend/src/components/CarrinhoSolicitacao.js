import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import "../styles/styles_solicitacao.css";
import { AuthContext } from '../context/authContext'; // Importe o contexto de autenticação

const CarrinhoSolicitacao = () => {
  const { userLogin } = useContext(AuthContext); // Obtenha o email do contexto de autenticação
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

  const handleAdicionarSolicitacao = async (servicoId) => {
    try {
      const response = await api.post('/api/solicitacoes', {
        email: userLogin, 
        servicoId,
        estado: 'Em Andamento', 
      });
      setSolicitacoes([...solicitacoes, response.data]);
    } catch (error) {
      setMensagem('Erro ao adicionar solicitação');
    }
  };

  const handleExcluirSolicitacao = async (solicitacaoId) => {
    try {
      await api.delete(`/api/solicitacoes/${solicitacaoId}`);
      setSolicitacoes(solicitacoes.filter(solicitacao => solicitacao.id !== solicitacaoId));
    } catch (error) {
      setMensagem('Erro ao excluir solicitação. Tente novamente mais tarde.');
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
            {solicitacao.servico ? (
              <>
                Serviço: {solicitacao.servico.nome}, Status: {solicitacao.Estado}, Data Prevista: {new Date(solicitacao.dataPrevista).toLocaleDateString()}
              </>
            ) : (
              'Serviço não encontrado'
            )}
            <button onClick={() => handleExcluirSolicitacao(solicitacao.id)}>Excluir Solicitação</button>
          </li>
        ))}
        </ul>
      </div>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default CarrinhoSolicitacao;
