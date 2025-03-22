import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout, getCurrentUser, isAuthenticated } from "../services/authService";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (isAuthenticated()) {
        try {
          const { data } = await getCurrentUser();
          setCurrentUser(data);
        } catch (error) {
          // Token might be invalid or expired
          apiLogout();
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    const response = await apiLogin(email, password);
    setCurrentUser(response.user);
    return response;
  };

  const register = async (userData) => {
    const response = await apiRegister(userData);
    setCurrentUser(response.user);
    return response;
  };

  const logout = () => {
    apiLogout();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        isAuthenticated: !!currentUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);