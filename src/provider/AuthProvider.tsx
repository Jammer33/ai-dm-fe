// AuthContext.tsx
import Cookies from 'js-cookie';
import React, { ReactNode, createContext, useContext, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

interface AuthState {
    isAuthenticated: boolean;
    user: User | undefined; // Replace 'any' with your user object type
    login: (user: User) => void; // Replace 'any' with your user object type
    logout: () => void;
  }

const AuthContext = createContext<AuthState | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(); // Replace 'any' with your user object type
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(undefined);
    setIsAuthenticated(false);
    // Clear cookie
    Cookies.remove('token');
  };

  // Optional: Add useEffect to check initial authentication state, e.g., check if token exists in storage (make a request to the server and see if comes back authed?)

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    // navigate('/dashboard');
    return null;
  }

}
