import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TrocaSenhaPage from './pages/TrocaSenhaPage';
import CadastroClientePage from './pages/CadastroClientePage';
import CarrinhoSolicitacaoPage from './pages/CarrinhoSolicitacaoPage';

const App = () => {
  const [token, setToken] = useState('');
  const [userLogin, setUserLogin] = useState('');

  const handleLogin = (token, userLogin) => {
    setToken(token);
    setUserLogin(userLogin);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/trocar-senha" element={token ? <TrocaSenhaPage /> : <Navigate to="/login" />} />
        <Route path="/cadastro-cliente" element={<CadastroClientePage/>}/>
        <Route path="/carrinho-solicitacao" element={token ? <CarrinhoSolicitacaoPage userLogin={userLogin} /> : <Navigate to="/login" />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
