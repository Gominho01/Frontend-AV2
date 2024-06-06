import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles-login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('api/login', { email, senha });
      console.log(response.result);
      if (response.result) {
        onLogin(response.data.token, email);
        setMensagem('Login bem-sucedido');
        navigate.push('/');
      } else {
        setMensagem('Login ou senha incorretos');
      }
    } catch (error) {
      setMensagem('Erro ao efetuar login');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
