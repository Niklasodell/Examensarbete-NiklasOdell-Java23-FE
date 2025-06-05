import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  deleteAccount: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/check-session', {
          credentials: 'include',
        });
        setIsAuthenticated(res.ok);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  const login = async (username: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    if (!response.ok) throw new Error('Login failed');

    localStorage.setItem('token', 'dummy-token');
    setIsAuthenticated(true);
    navigate('/wishlist');
  };

  const logout = () => {
    fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).then(() => {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      navigate('/login');
    });
  };

  const deleteAccount = async (): Promise<boolean> => {
    const confirmed = window.confirm(
      'Är du säker på att du vill ta bort ditt konto?'
    );
    if (!confirmed) return false;

    const res = await fetch('/api/auth/delete', {
      method: 'DELETE',
      credentials: 'include',
    });

    if (res.ok) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, deleteAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth måste användas inom en <AuthProvider>');
  }
  return context;
};
