import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [cartUpdated, setCartUpdated] = useState(true);

  useEffect(() => {
    const prevUser = JSON.parse(localStorage.getItem("user"));
    if (prevUser?.token?.length > 0) {
      setUser(JSON.parse(localStorage.getItem("user")))
      setIsLoggedIn(true)
    }

  }, [cartUpdated])


  const updatedCart = () => {

    setCartUpdated(!cartUpdated)
  }

  const login = () => {
    setUser(JSON.parse(localStorage.getItem("user")))
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("user")
    setIsLoggedIn(false);
  };


  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout, updatedCart, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);