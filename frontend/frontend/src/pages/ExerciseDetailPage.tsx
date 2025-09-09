import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Exercise, Option } from '../types/exercise'; // Importamos también el tipo Option
import { useExercises } from '../context/ExerciseContext';
import Spinner from '../components/Spinner';
import { FaArrowLeft } from 'react-icons/fa';
import './ExerciseDetailPage.css';

function ExerciseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { exercises } = useExercises();

  // Estados para gestionar la lógica de la página
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Estados para la interacción del usuario
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [checkResult, setCheckResult] = useState<'correct' | 'incorrect' | null>(null);

  // Lógica para encontrar el siguiente ejercicio
  const currentExerciseIndex = exercises.findIndex(ex => ex.id === Number(id));
  const nextExerciseId = currentExerciseIndex !== -1 && currentExerciseIndex < exercises.length - 1
    ? exercises[currentExerciseIndex + 1].id
    : null;

  // Efecto para buscar el ejercicio y resetear el estado cuando cambia el ID de la URL
  useEffect(() => {
    const fetchExerciseAndResetState = async () => {
      if (!id) return;

      // Reseteamos el estado para la nueva pregunta
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

  // Manejador para cuando el usuario selecciona una opción
  const handleOptionSelect = (optionId: number) => {
    if (checkResult) return; // No permitir cambiar si ya se comprobó
    setSelectedOptionId(optionId);
  };

  // Manejador para cuando el usuario hace clic en "Comprobar Respuesta"
  const handleCheckAnswer = async () => {
    if (selectedOptionId === null) return;

    try {
      const response = await fetch('http://localhost:8080/api/exercises/submit-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionId: selectedOptionId }),
      });

      if (!response.ok) throw new Error('Error al enviar la respuesta.');

      const isCorrect: boolean = await response.json();
      setCheckResult(isCorrect ? 'correct' : 'incorrect');
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Ocurrió un error desconocido.');
    }
  };

  // Función para determinar las clases CSS de cada botón de opción
  const getOptionClassName = (option: Option) => {
    const classNames = ['option-button'];

    // Si la opción está seleccionada (antes de comprobar)
    if (selectedOptionId === option.id && !checkResult) {
      classNames.push('selected');
    }

    // Después de comprobar, coloreamos según el resultado
    if (checkResult) {
      if (option.isCorrect) {
        classNames.push('correct'); // La correcta siempre es verde
      }
      if (selectedOptionId === option.id && checkResult === 'incorrect') {
        classNames.push('incorrect'); // La que seleccionó mal el usuario es roja
      }
    }
    return classNames.join(' ');
  };

  // Renderizado condicional para estados de carga y error
  if (error) return <div className="error-message">{error}</div>;
  if (!exercise) return <Spinner />;

  // Renderizado principal del componente
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
              disabled={!!checkResult} // Se deshabilitan después de comprobar
            >
              {option.text}
            </button>
          ))}
        </div>
        
        {/* Contenedor para los botones de acción */}
        <div className="action-container">
          {/* Si aún no se ha comprobado, muestra el botón "Comprobar" */}
          {!checkResult ? (
            <button 
              className="check-button" 
              onClick={handleCheckAnswer} 
              disabled={selectedOptionId === null}
            >
              Comprobar Respuesta
            </button>
          ) : (
            /* Si ya se comprobó, muestra el feedback y el botón "Siguiente" */
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