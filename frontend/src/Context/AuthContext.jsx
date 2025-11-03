import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // App लोड होने पर, localStorage से token निकालने की कोशिश करें
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (apiToken) => {
    // जब यूजर लॉग इन करे, तो token को localStorage और state दोनों में सेव करें
    localStorage.setItem('token', apiToken);
    setToken(apiToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // जब यूजर लॉग आउट करे, तो token को localStorage और state दोनों से हटा दें
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};














