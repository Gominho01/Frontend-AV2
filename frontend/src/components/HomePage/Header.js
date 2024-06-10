import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import "../../styles/header.css";

const Header = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isCadastroPage = location.pathname === '/cadastro-cliente';
  const { token, logout } = useContext(AuthContext);

  return (
    <header>
      <img src="../imagens/Logo.jpeg" alt="Logo da Empresa" />
      <h1>Bem-vindo à Cloud Solutions</h1>
      <nav>
        <ul id="menu">
          {token ? (
            <>
              <li><Link to="/carrinho-solicitacao">Solicitar Serviços</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </>
          ) : isCadastroPage ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/">Tela inicial</Link></li>
            </>
          ) : isLoginPage ? (
            <>
            <li><Link to="/">Tela Inicial</Link></li>
            <li><Link to="/cadastro-cliente">Cadastre-se</Link></li>
            </>
          ) : (
            <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/cadastro-cliente">Cadastre-se</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
