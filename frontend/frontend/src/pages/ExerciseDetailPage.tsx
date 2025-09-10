import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Exercise, Option } from '../types/exercise';
import { useExercises } from '../context/ExerciseContext';
import Spinner from '../components/Spinner';
import { FaArrowLeft } from 'react-icons/fa';
import './ExerciseDetailPage.css';
import { useAuth } from '../context/AuthContext';

function ExerciseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { exercises } = useExercises();
  
  // Obtenemos las herramientas del AuthContext
  const { token, updateUserProgress } = useAuth();

  // Estados locales de la página
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [checkResult, setCheckResult] = useState<'correct' | 'incorrect' | null>(null);

  // Lógica para encontrar el siguiente ejercicio (sin cambios)
  const currentExerciseIndex = exercises.findIndex(ex => ex.id === Number(id));
  const nextExerciseId = currentExerciseIndex !== -1 && currentExerciseIndex < exercises.length - 1
    ? exercises[currentExerciseIndex + 1].id
    : null;

  // Efecto para buscar el ejercicio y resetear el estado (sin cambios)
  useEffect(() => {
    const fetchExerciseAndResetState = async () => {
      if (!id) return;
      setExercise(null);
      setError(null);
      setSelectedOptionId(null);
      setCheckResult(null);

      try {
        const response = await fetch(`http://localhost:8080/api/exercises/${id}`);
        if (!response.ok) throw new Error(`El ejercicio no fue encontrado.`);
        const data: Exercise = await response.json();
        setExercise(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError('Ocurrió un error desconocido.');
      }
    };
    fetchExerciseAndResetState();
  }, [id]);

  // Manejador para la selección de opción (sin cambios)
  const handleOptionSelect = (optionId: number) => {
    if (checkResult) return;
    setSelectedOptionId(optionId);
  };

  // --- MANEJADOR DE COMPROBACIÓN ACTUALIZADO ---
  const handleCheckAnswer = async () => {
    if (selectedOptionId === null) return;

    console.log("Paso 1: Iniciando handleCheckAnswer.");

    try {
      const response = await fetch('http://localhost:8080/api/exercises/submit-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionId: selectedOptionId }),
      });

      const isCorrect: boolean = await response.json();
      setCheckResult(isCorrect ? 'correct' : 'incorrect');
      console.log("Paso 2: Respuesta de /submit-answer recibida. Es correcta:", isCorrect);

      if (isCorrect) {
        console.log("Paso 3: La respuesta es correcta. Intentando guardar progreso...");
        try {
          const progressResponse = await fetch(`http://localhost:8080/api/progress/complete/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
          
          console.log("Paso 4: Respuesta de /progress/complete recibida. Status:", progressResponse.status);

          if (!progressResponse.ok) {
            throw new Error(`El servidor respondió con status: ${progressResponse.status}`);
          }
          
          console.log("Paso 5: Progreso guardado en backend. Llamando a updateUserProgress...");
          
          // --- ¡LA LÍNEA CLAVE QUE FALTABA! ---
          updateUserProgress(Number(id));
          
          console.log("Paso 6: updateUserProgress fue llamado.");

        } catch (err) {
          console.error("FALLO en el bloque de guardado de progreso:", err);
        }
      }
    } catch (err) {
      console.error("FALLO en el bloque de comprobación de respuesta:", err);
      if (err instanceof Error) setError(err.message);
      else setError('Ocurrió un error desconocido.');
    }
  };

  // Función para determinar las clases CSS (sin cambios)
  const getOptionClassName = (option: Option) => {
    const classNames = ['option-button'];
    if (selectedOptionId === option.id && !checkResult) {
      classNames.push('selected');
    }
    if (checkResult) {
      if (option.isCorrect) {
        classNames.push('correct');
      }
      if (selectedOptionId === option.id && checkResult === 'incorrect') {
        classNames.push('incorrect');
      }
    }
    return classNames.join(' ');
  };

  // Renderizado condicional (sin cambios)
  if (error) return <div className="error-message">{error}</div>;
  if (!exercise) return <Spinner />;

  // JSX principal (sin cambios)
  return (
    <div className="detail-page-container">
      <Link to="/" className="back-link">
        <FaArrowLeft />
        <span>Volver a la lista</span>
      </Link>
      
      <h1 className="exercise-title">{exercise.title}</h1>
      <p className="exercise-statement">{exercise.statement}</p>
      
      {exercise.codeSnippet && (
        <pre className="code-snippet">
          <code>{exercise.codeSnippet}</code>
        </pre>
      )}

      <div className="options-container">
        <h2 className="options-title">Opciones:</h2>
        <div className="options-list">
          {exercise.options.map((option: Option) => (
            <button
              key={option.id}
              className={getOptionClassName(option)}
              onClick={() => handleOptionSelect(option.id)}
              disabled={!!checkResult}
            >
              {option.text}
            </button>
          ))}
        </div>
        
        <div className="action-container">
          {!checkResult ? (
            <button 
              className="check-button" 
              onClick={handleCheckAnswer} 
              disabled={selectedOptionId === null}
            >
              Comprobar Respuesta
            </button>
          ) : (
            <div className="feedback-container">
              <p className={checkResult === 'correct' ? 'feedback correct' : 'feedback incorrect'}>
                {checkResult === 'correct' ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta.'}
              </p>
              {checkResult === 'correct' && nextExerciseId && (
                <Link to={`/exercise/${nextExerciseId}`} className="next-button">
                  Siguiente Ejercicio →
                </Link>
              )}
              {checkResult === 'correct' && !nextExerciseId && (
                <p className="feedback correct">¡Felicidades, has completado todos los ejercicios!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExerciseDetailPage;