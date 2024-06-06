// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/header.css"

const Header = () => {
  return (
    <header>
      <img src="../imagens/Logo.jpeg" alt="Logo da Empresa" />
      <h1>Bem-vindo à Cloud Solutions</h1>
      <nav>
        <ul id="menu">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="cadastro-cliente">Cadastre-se</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
