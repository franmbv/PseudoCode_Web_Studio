import { useState, useEffect } from 'react';
import { Exercise } from './types/exercise'; // 1. ¡Importamos nuestro tipo!
import './App.css';

function App() {
  // 2. Le decimos a useState que nuestro estado será un ARRAY DE EJERCICIOS.
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/exercises');
        if (!response.ok) {
          throw new Error('Error al conectar con el backend. ¿Está encendido?');
        }
        // 3. Le decimos a TypeScript que los datos que vienen son de tipo Exercise[]
        const data: Exercise[] = await response.json();
        console.log("Datos recibidos:", data);
        setExercises(data);
      } catch (err) {
        // TypeScript sabe que 'err' es de tipo 'unknown', así que lo manejamos con seguridad.
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocurrió un error desconocido.');
        }
        console.error(err);
      }
    };

    fetchExercises();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>PseInt Web Studio - Lista de Ejercicios</h1>
        
        {/* Mostramos un mensaje de error si algo falló */}
        {error && <div className="error-message">{error}</div>}

        <div className="exercise-list">
          {exercises.length > 0 ? (
            <ul>
              {/* 4. ¡Magia! Al escribir 'exercise.', VS Code te sugerirá 'id', 'title', etc. */}
              {exercises.map(exercise => (
                <li key={exercise.id}>
                  <p>{exercise.title}</p>
                  <p>{exercise.statement}</p>
                  <p>{exercise.codeSnippet}</p>
                  <p>{exercise.options.map(option => (
                    <span key={option.id}>{option.text} </span>
                  ))}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>{error ? '' : 'Cargando ejercicios...'}</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;