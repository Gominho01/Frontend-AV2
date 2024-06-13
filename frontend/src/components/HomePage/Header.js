import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import Logo from '../../imagens/Logo.jpeg';
import '../../styles/header.css'

const Header = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isCadastroPage = location.pathname === '/cadastro-cliente';
  const isHomePage = location.pathname === '/'
  const { token, logout } = useContext(AuthContext);

  // Verifica se está na página de solicitações
  const isSolicitacoesPage = location.pathname === '/solicitacao';

  return (
    <header>
      <img src={Logo} alt="Logo da Empresa" />
      {isHomePage ? (
        <h1>Bem-vindo à Cloud Solutions</h1>
      ):(
        <></>
      )}
      <nav>
        <ul id="menu">
          {token ? (
            <>
              {isSolicitacoesPage ? (
                // Se estiver na página de solicitações, exibe apenas o link "Tela inicial"
                <>
                  <li><Link to="/">Tela Inicial</Link></li>
                  <li><Link to="/criar-servico">Criar serviços</Link></li>
                  <li><button className="logout-button" onClick={logout}>Logout</button></li>
                </>
              ) : (
                // Se não estiver na página de solicitações, exibe os links "Solicitar Serviços" e "Logout"
                <>
                  <li><Link to="/solicitacao">Solicitar Serviços</Link></li>
                  <li><button className="logout-button" onClick={logout}>Logout</button></li>
                </>
              )}
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
