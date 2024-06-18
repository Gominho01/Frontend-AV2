import React from 'react';
import CadastroCliente from '../components/CadastroCliente';
import Header from '../components/HomePage/Header';

const CadastroClientePage = () => {
  return (
    <div>
      <Header/>
      <CadastroCliente />
    </div>
  );
};

export default CadastroClientePage;
