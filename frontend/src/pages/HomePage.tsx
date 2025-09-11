import { useState } from 'react';
import { useExercises } from '../context/ExerciseContext';
import Spinner from '../components/Spinner';
import ExerciseCard from '../components/ExerciseCard'; 
import './HomePage.css'; 
import { FaLock, FaTrophy, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const { exercises, isLoading, error } = useExercises();
  const { user, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 8;

  if (isLoading) return <Spinner />;
  if (error) return <div className="error-message">{error}</div>;

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);
  const totalPages = Math.ceil(exercises.length / exercisesPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const userProgress = user?.progress ?? 0;

  return (
    <div className="homepage-container">
      {isAuthenticated && (
        <div className="progress-trophy">
          <FaTrophy className="trophy-icon" />
          <span className="trophy-text">
            {userProgress} / {exercises.length} Completados
          </span>
        </div>
      )}

      <h1 className="homepage-title">Selecciona un Ejercicio</h1>
      <p className="homepage-subtitle">Haz clic en una tarjeta para comenzar</p>
      
      <div className="exercise-grid">
        {currentExercises.map((exercise, index) => {
          const globalIndex = indexOfFirstExercise + index;

          // --- LÓGICA DE BLOQUEO SIMPLIFICADA Y CORREGIDA ---
          let isLocked: boolean;

          if (isAuthenticated) {
            // Si el usuario está autenticado, el bloqueo depende de su progreso.
            // Un ejercicio está bloqueado si su índice es mayor que el número de ejercicios completados.
            isLocked = globalIndex > userProgress;
          } else {
            // Si no está autenticado, solo el primer ejercicio (índice 0) está desbloqueado.
            isLocked = globalIndex > 0;
          }

          // Ahora usamos la variable 'isLocked' en una sola condición.
          if (isLocked) {
            return (
              <div key={exercise.id} className="exercise-card locked">
                <div className="card-icon"><FaLock /></div>
                <span className="exercise-card-number">Ejercicio {globalIndex + 1}</span>
              </div>
            );
          }

          // Si no está bloqueado, se muestra la tarjeta normal.
          return <ExerciseCard key={exercise.id} exercise={exercise} index={globalIndex} />;
        })}
      </div>

      {totalPages > 1 && (
        <div className="pagination-container">
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            className="pagination-button"
          >
            <FaArrowLeft />
            <span>Anterior</span>
          </button>
          <span className="page-indicator">
            Página {currentPage} de {totalPages}
          </span>
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            <span>Siguiente</span>
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;