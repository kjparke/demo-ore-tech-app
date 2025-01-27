import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import axios from 'axios';
import { mockUser } from '../constants/MockUser';

export type AuthUser = {
  id: string
  firstName: string;
  lastName: string;
  email: string;
  accessLevel: number;
};

type AuthContextType = {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  token: string | null;
  setToken: (newToken: string | null) => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [token, setToken_] = useState<string | null>(
    localStorage.getItem('token')
  );

  const setToken = (newToken: string | null) => {
    setToken_(newToken);
  };

  useEffect(() => {
    setUser(mockUser);
    setToken(mockUser.accessToken);
  }, [])

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      token,
      setToken,
    }),
    [user, token]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
