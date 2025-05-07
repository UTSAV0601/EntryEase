import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user on initial load to preserve session
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/auth/me', { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const login = async ({ email, password }) => {
    const res = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
    setUser(res.data.user);
  };

  const register = async ({ name, email, password }) => {
    const res = await axios.post('/api/auth/register', { name, email, password }, { withCredentials: true });
    setUser(res.data.user);
  };

  const logout = async () => {
    await axios.post('/api/auth/logout', {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
