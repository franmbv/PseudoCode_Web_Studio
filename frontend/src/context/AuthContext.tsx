// src/context/AuthContext.tsx
import { createContext, useState, useEffect, useContext } from 'react';
import type {  ReactNode } from 'react';
import type { User } from '../types/user';

// La forma de los datos que guardaremos sobre el usuario
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

// El CONTRATO que nuestro contexto proporcionará
interface AuthContextType extends AuthState {
  login: (data: { token: string; username: string; email: string; id: number; progress: number; }) => void; // <-- CORREGIDO
  logout: () => void;
  updateUserProgress: (newProgress: number) => void;
}

// Creamos el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// El componente Proveedor
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: true, 
  });

  // Efecto que se ejecuta UNA SOLA VEZ al cargar la app
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

  // La IMPLEMENTACIÓN de la función login
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

const updateUserProgress = (newProgress: number) => {
  // --- AÑADE ESTAS LÍNEAS DE DEPURACIÓN ---
  console.log(`[AuthContext] Intentando actualizar el progreso a: ${newProgress}`);
  
  setAuthState(prevState => {
    console.log('[AuthContext] Estado ANTES de la actualización:', prevState);
    if (prevState.user) {
      // Creamos un objeto de usuario completamente nuevo para asegurar la inmutabilidad
      const updatedUser: User = { 
        ...prevState.user, 
        progress: newProgress 
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));

      const newState = { ...prevState, user: updatedUser };
      console.log('[AuthContext] Estado DESPUÉS de la actualización:', newState);
      return newState;
    }
    return prevState;
  });
};

  const value = { ...authState, login, logout, updateUserProgress };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};