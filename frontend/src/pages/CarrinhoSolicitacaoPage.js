import React from 'react';
import CarrinhoSolicitacao from '../components/CarrinhoSolicitacao';
import Header from '../components/HomePage/Header';

const CarrinhoSolicitacaoPage = ({ userLogin }) => {
  return (
    <div>
      <Header/>
      <CarrinhoSolicitacao userLogin={userLogin} />
    </div>
  );
};

export default CarrinhoSolicitacaoPage;
