import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Jab app load ho, to check karo ki token pehle se hai ya nahi
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('userToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Ek custom hook jisse context ko use karna aasan ho jaye
export const useAuth = () => {
  return useContext(AuthContext);
};