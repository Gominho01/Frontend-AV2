import React, { useState, useEffect } from 'react';
import api from '../services/api';

const HomePage = () => {
  const [servicos, setServicos] = useState([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await api.get('api/servico');
        setServicos(response.data.servicos);
      } catch (error) {
        setMensagem('Erro ao carregar serviços');
      }
    };

    fetchServicos();
  }, []);

  return (
    <div className="homepage-container">
      <h1>Serviços Disponíveis</h1>
      {mensagem && <p>{mensagem}</p>}
      <ul>
        {servicos.map(servico => (
          <li key={servico.id}>
            {servico.nome} - R$ {servico.preco.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
