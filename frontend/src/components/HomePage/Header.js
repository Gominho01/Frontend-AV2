import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../../styles/header.css";

const Header = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isCadastroPage = location.pathname === '/cadastro-cliente';

  return (
    <header>
      <img src="../imagens/Logo.jpeg" alt="Logo da Empresa" />
      <h1>Bem-vindo à Cloud Solutions</h1>
      <nav>
        <ul id="menu">
          {isLoginPage ? (
            <>
              <li><Link to="/">Página Principal</Link></li>
              <li><Link to="/cadastro-cliente">Cadastre-se</Link></li>
            </>
          ) : isCadastroPage ? (
            <>
              <li><Link to="/">Página Principal</Link></li>
              <li><Link to="/login">Login</Link></li>
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
