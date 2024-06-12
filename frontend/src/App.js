import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/authContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TrocaSenhaPage from './pages/TrocaSenhaPage';
import CadastroClientePage from './pages/CadastroClientePage';
import CarrinhoSolicitacaoPage from './pages/CarrinhoSolicitacaoPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPageWrapper />} />
          <Route path="/trocar-senha" element={<TrocaSenhaPage />}/>
          <Route path="/cadastro-cliente" element={<CadastroClientePage />} />
          <Route path="/solicitacao" element={<RequireAuth><CarrinhoSolicitacaoPage /></RequireAuth>} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const LoginPageWrapper = () => {
  const { login } = useContext(AuthContext);
  return <LoginPage onLogin={login} />;
};

const RequireAuth = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};

export default App;
