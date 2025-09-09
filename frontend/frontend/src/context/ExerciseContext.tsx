import { createContext, useState, useEffect, useContext } from 'react';
import type {ReactNode } from 'react';
import type { Exercise } from '../types/exercise';

// 1. Definimos la "forma" de los datos que nuestro contexto manejará.
interface ExerciseContextType {
  exercises: Exercise[];
  isLoading: boolean;
  error: string | null;
}

// 2. Creamos el Contexto con un valor inicial.
const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

// 3. Creamos el "Proveedor", el componente que hará el trabajo.
export const ExerciseProvider = ({ children }: { children: ReactNode }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/exercises');
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
  }, []); // El array vacío asegura que solo se ejecute una vez.

  const value = { exercises, isLoading, error };

  return <ExerciseContext.Provider value={value}>{children}</ExerciseContext.Provider>;
};

// 4. Creamos un "hook" personalizado para consumir el contexto fácilmente.
export const useExercises = () =>{
  const context = useContext(ExerciseContext);
  if (context === undefined) {
    throw new Error('useExercises debe ser usado dentro de un ExerciseProvider');
  }
  return context;
};