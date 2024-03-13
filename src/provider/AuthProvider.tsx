// AuthContext.tsx
import Cookies from 'js-cookie';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { getVerify } from '../api/GetVerify';

interface AuthState {
    isAuthenticated: boolean | null;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const logout = () => {
    setUser(undefined);
    setIsAuthenticated(false);
    // Clear cookie
    let domain;
    if (process.env.NODE_ENV === 'production') {
      domain = '.wizardgm.ai';
    } else if (process.env.NODE_ENV === 'staging') {
      domain = '.staging.wizardgm.ai';
    } else {
      domain = 'localhost';
    }

    Cookies.remove('token', { domain, path: '/' });
  };

  const checkUserToken = async () => {
    const userToken = Cookies.get('token');
    if (!userToken || userToken === 'undefined') {
      setIsAuthenticated(false);
      return;
    }
    
    
    try {
      const response = await getVerify();

      if (response.email) {
        const {email, userToken} = response;
        const username = email.split("@")[0];
        setUser({username, email, userToken});
      }
      setIsAuthenticated(true);
    } catch (error) {
        console.log(error);
        console.log("Invalid token");
        setIsAuthenticated(false);
    }
  }
  
  useEffect(() => {
    checkUserToken();
  }, []);

  const login = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
  };

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

// export const useProtectedRoute = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();
//   if (!isAuthenticated) {
//     navigate('/login');
//   }
// }
