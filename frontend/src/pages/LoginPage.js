import React from 'react';
import Login from '../components/Login';
import "../styles/index.css"
import Header from '../components/HomePage/Header';

const LoginPage = ({ onLogin }) => {
  return (
    <div>
      <Header/>
      <Login onLogin={onLogin} />
    </div>
  );
};

export default LoginPage;
