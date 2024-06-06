import React, { useState } from 'react';
import api from '../services/api';
import '../styles-login.css';

const Login = ({ onLogin }) => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth', { login, senha });
      if (response.data.status === 'success') {
        setMensagem('Login bem-sucedido');
        onLogin(response.data.token);
      } else {
        setMensagem(response.data.message);
      }
    } catch (error) {
      setMensagem('Erro ao fazer login');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="login">Login</label>
          <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        <div className="button-group">
          <button type="submit">Entrar</button>
        </div>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default Login;
