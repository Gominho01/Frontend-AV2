import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [userLogin, setUserLogin] = useState('');

  const login = (newToken, userLogin) => {
    setToken(newToken);
    setUserLogin(userLogin);
  };

  const logout = () => {
    setToken(false);
    setUserLogin('');
  };

  return (
    <AuthContext.Provider value={{ token, userLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
