import React from 'react';
import CarrinhoSolicitacao from '../components/CarrinhoSolicitacao';

const CarrinhoSolicitacaoPage = ({ userLogin }) => {
  return (
    <div>
      <CarrinhoSolicitacao userLogin={userLogin} />
    </div>
  );
};

export default CarrinhoSolicitacaoPage;
