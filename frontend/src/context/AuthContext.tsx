import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/user';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (data: { token: string; username:string; email: string; id: number; progress: number; }) => void;
  logout: () => void;
  updateUserProgress: (completedExerciseIndex: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: true,
  });

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const userString = localStorage.getItem('user');
      if (token && userString) {
        const user = JSON.parse(userString);
        setAuthState({ isAuthenticated: true, user, token, isLoading: false });
      } else {
        setAuthState(prevState => ({ ...prevState, isLoading: false }));
      }
    } catch (error) {
      console.error("Failed to parse auth data", error);
      localStorage.clear();
      setAuthState({ isAuthenticated: false, user: null, token: null, isLoading: false });
    }
  }, []);

  const login = (data: { token: string; username: string; email: string; id: number; progress: number; }) => {
    const userToStore: User = {
      id: data.id,
      username: data.username,
      email: data.email,
      progress: data.progress
    };
    
    localStorage.setItem('token', JSON.stringify(data.token));
    localStorage.setItem('user', JSON.stringify(userToStore));

    setAuthState({
      isAuthenticated: true,
      user: userToStore,
      token: data.token,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: false,
    });
  };

  const updateUserProgress = (completedExerciseIndex: number) => {
    const newProgress = completedExerciseIndex + 1;

    setAuthState(prevState => {
      if (!prevState.user) {
        return prevState;
      }

      const currentProgress = prevState.user.progress ?? 0;

      if (newProgress > currentProgress) {
        const updatedUser: User = { ...prevState.user, progress: newProgress };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return { ...prevState, user: updatedUser };
      }

      return prevState;
    });
  };

  const value = { ...authState, login, logout, updateUserProgress };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};