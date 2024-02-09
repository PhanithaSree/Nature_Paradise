// LoginProvider.js
import React, { useState } from 'react';
import LoginContext from './LoginContext';

const LoginProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = () => {
    setAuthenticated(true);
  };

  const logout = () => {
    setAuthenticated(false);
  };

  return (
    <LoginContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
