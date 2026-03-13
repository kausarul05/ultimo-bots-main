"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated (check token in localStorage/cookies)
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // You can validate token with your API here
          // For now, simulate authenticated user
          setUser({
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            isAuthenticated: true
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Call your API
    // const response = await api.post('/auth/login', { email, password });
    // localStorage.setItem('token', response.data.token);
    
    // Simulate login
    setUser({
      id: '1',
      name: 'John Doe',
      email: email,
      isAuthenticated: true
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}