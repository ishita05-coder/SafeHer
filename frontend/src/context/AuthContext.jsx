import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify(res.data));
        setUser(res.data);
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      return false;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const res = await api.post('/auth/register', userData);
      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify(res.data));
        setUser(res.data);
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
