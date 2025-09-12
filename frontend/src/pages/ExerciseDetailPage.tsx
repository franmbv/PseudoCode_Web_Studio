import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import FillInTheBlank from '../components/exercise-types/FillInTheBlank';
import DragAndDrop from '../components/exercise-types/DragAndDrop'; 
import type { Exercise, Option } from '../types/exercise';
import { useExercises } from '../context/ExerciseContext';
import Spinner from '../components/Spinner';
import { FaArrowLeft } from 'react-icons/fa';
import './ExerciseDetailPage.css';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';


interface ExerciseWithDetails extends Exercise {
  type: 'MULTIPLE_CHOICE' | 'FILL_IN_THE_BLANKS' | 'DRAG_AND_DROP'; 
}

function ExerciseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { exercises } = useExercises();
  const { token, updateUserProgress } = useAuth();
  const [exercise, setExercise] = useState<ExerciseWithDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [checkResult, setCheckResult] = useState<'correct' | 'incorrect' | null>(null);
  const currentExerciseIndex = exercises.findIndex(ex => ex.id === Number(id));
  const nextExerciseId = currentExerciseIndex !== -1 && currentExerciseIndex < exercises.length - 1
    ? exercises[currentExerciseIndex + 1].id
    : null;

  useEffect(() => {
    const fetchExerciseAndResetState = async () => {
      if (!id) return;
      setExercise(null);
      setError(null);
      setSelectedOptionId(null);
      setCheckResult(null);

      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.exercises}/${id}`);
        if (!response.ok) throw new Error(`El ejercicio no fue encontrado.`);
        const data: ExerciseWithDetails = await response.json();
        setExercise(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError('Ocurrió un error desconocido.');
      }
    };
    fetchExerciseAndResetState();
  }, [id]);

  const handleOptionSelect = (optionId: number) => {
    if (checkResult) return;
    setSelectedOptionId(optionId);
  };

  const handleAnswerSubmission = async (isCorrect: boolean) => {
    setCheckResult(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      try {
        const progressResponse = await fetch(`${API_BASE_URL}${API_ENDPOINTS.completeProgress}/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (!progressResponse.ok) {
          throw new Error(`El servidor respondió con status: ${progressResponse.status}`);
        }
        updateUserProgress(Number(id));
      } catch (err) {
        console.error("FALLO en el bloque de guardado de progreso:", err);
      }
    }
  };

  const handleCheckMultipleChoice = async () => {
    if (selectedOptionId === null) return;
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.submitAnswer}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionId: selectedOptionId }),
      });
      const isCorrect: boolean = await response.json();
      handleAnswerSubmission(isCorrect);
    } catch (err) {
      console.error("FALLO en la comprobación de opción múltiple:", err);
      if (err instanceof Error) setError(err.message);
      else setError('Ocurrió un error desconocido.');
    }
  };

  const getOptionClassName = (option: Option) => {
    const classNames = ['option-button'];
    if (selectedOptionId === option.id && !checkResult) classNames.push('selected');
    if (checkResult) {
      if (option.isCorrect) classNames.push('correct');
      if (selectedOptionId === option.id && checkResult === 'incorrect') classNames.push('incorrect');
    }
    return classNames.join(' ');
  };

  if (error) return <div className="error-message">{error}</div>;
  if (!exercise) return <Spinner />;

  const renderAnswerComponent = () => {
    switch (exercise.type) {
      case 'FILL_IN_THE_BLANKS':
        return (
          <FillInTheBlank
            options={exercise.options}
            onAnswerSubmit={handleAnswerSubmission}
            disabled={!!checkResult}
          />
        );
      case 'DRAG_AND_DROP':
        return (
          <DragAndDrop
            options={exercise.options}
            onAnswerSubmit={handleAnswerSubmission}
            disabled={!!checkResult}
          />
        );
      case 'MULTIPLE_CHOICE':
      default:
        return (
          <>
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
            {!checkResult && (
              <div className="action-container">
                <button 
                  className="check-button" 
                  onClick={handleCheckMultipleChoice} 
                  disabled={selectedOptionId === null}
                >
                  Comprobar Respuesta
                </button>
              </div>
            )}
          </>
        );
    }
  };

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
        <h2 className="options-title">Tu Respuesta:</h2>
        
        {renderAnswerComponent()}

        {checkResult && (
          <div className="feedback-container action-container">
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
  );
}

export default ExerciseDetailPage;