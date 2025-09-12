import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/user';
import { useExercises } from './ExerciseContext'; 

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (data: { token: string; username: string; email: string; id: number; progress: number; }) => void;
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
  
  const { exercises } = useExercises();

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
    
    localStorage.setItem('token', data.token);
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

  const updateUserProgress = (completedExerciseId: number) => {
    const newProgress = completedExerciseId;

    setAuthState(prevState => {
        if (!prevState.user) {
            return prevState;
        }
        
        const currentProgress = prevState.user.progress ?? 0;
        
        const maxProgress = exercises.length;
        const cappedProgress = Math.min(newProgress, maxProgress);

        if (cappedProgress > currentProgress) {
            const updatedUser: User = { ...prevState.user, progress: cappedProgress };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return { ...prevState, user: updatedUser };
        }

        return prevState;
    });
  };

  const value = { ...authState, login, logout, updateUserProgress };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ... (hook useAuth)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};