import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import "../styles/styles_solicitacao.css";
import { AuthContext } from '../context/authContext'; // Importa o contexto de autenticação

const CarrinhoSolicitacao = () => {
  const { userLogin} = useContext(AuthContext); // Obtenha o email e o nome do contexto de autenticação
  const [servicos, setServicos] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await api.get('/api/servicos');
        setServicos(response.data);
      } catch (error) {
        setMensagem('Erro ao carregar serviços');
      }
    };

    const fetchUserName = async () => {
      try {
        const response = await api.get(`/api/clientes/${userLogin}`);
        setUserName(response.data.cliente.nome);
      } catch (error) {
        setUserName('Nome não encontrado');
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
    fetchUserName();
  }, [userLogin]);

  const getServicoNome = (servicoId) => {
    const servico = servicos.find(servico => servico.id === servicoId);
    return servico ? servico.nome : 'Serviço não encontrado';
  };

  const handleAdicionarSolicitacao = async (servicoId) => {
    try {
      const response = await api.post('/api/solicitacoes', {
        email: userLogin, // Enviando o email do cliente
        servicoId,
        estado: 'Em Andamento', // Definindo o estado como "Em Andamento"
      });
      setSolicitacoes([...solicitacoes, response.data]);
    } catch (error) {
      setMensagem('Erro ao adicionar solicitação');
    }
  };

  const handleExcluirSolicitacao = async (id) => {
    try {
      await api.delete(`/api/solicitacoes/${id}`);
      setSolicitacoes(solicitacoes.filter(s => s.id !== id));
      setMensagem('Solicitação excluída com sucesso');
    } catch (error) {
      setMensagem('Erro ao excluir solicitação');
    }
  };

  return (
    <div className="carrinho-solicitacao-container">
      <h1>Carrinho de Solicitação de Serviços</h1>
      <div>
        <h2>Informações do Usuário</h2>
        <p>Nome: {userName}</p>
        <p>Email: {userLogin}</p>
      </div>
      <div>
        <h2>Serviços Disponíveis</h2>
        <ul>
          {servicos.map(servico => (
            <li key={servico.id}>
              {servico.nome} - R$ {servico.preco.toFixed(2)} - Prazo: {servico.prazo} dias
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
              Data do Pedido: {new Date(solicitacao.dataSolicitacao).toLocaleDateString()},
              ID: {solicitacao.id}, Nome do Serviço: {getServicoNome(solicitacao.servicoId)}, Status: {solicitacao.Estado}, 
              Preço: R$ {servicos.find(servico => servico.id === solicitacao.servicoId)?.preco.toFixed(2)}, 
              Data Prevista: {new Date(solicitacao.dataPrevista).toLocaleDateString()}
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
