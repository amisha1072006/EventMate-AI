import React, { createContext, useContext, useState, useEffect } from 'react';

const OwnerAuthContext = createContext(null);

export const OwnerAuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('ownerToken');
    if (storedToken) {
      setToken(storedToken);
      setIsOwnerAuthenticated(true);
    }
  }, []);

  const loginOwner = (apiToken) => {
    localStorage.setItem('ownerToken', apiToken);
    setToken(apiToken);
    setIsOwnerAuthenticated(true);
  };

  const logoutOwner = () => {
    localStorage.removeItem('ownerToken');
    setToken(null);
    setIsOwnerAuthenticated(false);
  };

  return (
    <OwnerAuthContext.Provider value={{ token, isOwnerAuthenticated, loginOwner, logoutOwner }}>
      {children}
    </OwnerAuthContext.Provider>
  );
};

export const useOwnerAuth = () => useContext(OwnerAuthContext);
