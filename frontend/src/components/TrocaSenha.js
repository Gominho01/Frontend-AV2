import React, { useState } from 'react';
import api from '../services/api';
import "./styles/trocar.css";

const TrocaSenha = () => {
  const [login, setLogin] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleTrocaSenha = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put('api/trocar-senha', { login, senhaAtual, novaSenha });
      setMensagem(response.data.message);
    } catch (error) {
      setMensagem('Erro ao trocar a senha');
    }
  };

  return (
    <div className="troca-senha-wrapper">
      <div className="troca-senha-container">
        <h1>Troca de Senha</h1>
        <form onSubmit={handleTrocaSenha}>
          <div className="input-group">
            <label htmlFor="login">Login</label>
            <input 
              type="text" 
              id="login" 
              value={login} 
              onChange={(e) => setLogin(e.target.value)} 
              placeholder="Digite seu login" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="senhaAtual">Senha Atual</label>
            <input 
              type="password" 
              id="senhaAtual" 
              value={senhaAtual} 
              onChange={(e) => setSenhaAtual(e.target.value)} 
              placeholder="Digite sua senha atual" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="novaSenha">Nova Senha</label>
            <input 
              type="password" 
              id="novaSenha" 
              value={novaSenha} 
              onChange={(e) => setNovaSenha(e.target.value)} 
              placeholder="Digite a nova senha" 
            />
          </div>
          <div className="button-group">
            <button type="submit">Trocar Senha</button>
          </div>
        </form>
        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
};

export default TrocaSenha;