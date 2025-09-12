import { createContext, useState, useEffect, useContext } from 'react';
import type {ReactNode } from 'react';
import type { Exercise } from '../types/exercise';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

interface ExerciseContextType {
  exercises: Exercise[];
  isLoading: boolean;
  error: string | null;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

export const ExerciseProvider = ({ children }: { children: ReactNode }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.exercises}`);
        if (!response.ok) {
          throw new Error('No se pudieron cargar los ejercicios.');
        }
        const data: Exercise[] = await response.json();
        setExercises(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError('Ocurrió un error desconocido.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, []); 

  const value = { exercises, isLoading, error };

  return <ExerciseContext.Provider value={value}>{children}</ExerciseContext.Provider>;
};

export const useExercises = () =>{
  const context = useContext(ExerciseContext);
  if (context === undefined) {
    throw new Error('useExercises debe ser usado dentro de un ExerciseProvider');
  }
  return context;
};