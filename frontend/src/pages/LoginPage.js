import React from 'react';
import Login from '../components/Login';
import "../styles/index.css"

const LoginPage = ({ onLogin }) => {
  return (
    <div>
      <Login onLogin={onLogin} />
    </div>
  );
};

export default LoginPage;
