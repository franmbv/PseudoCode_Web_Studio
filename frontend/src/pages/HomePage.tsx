// src/pages/HomePage.tsx (Versión con Cards)
import { useExercises } from '../context/ExerciseContext';
import Spinner from '../components/Spinner';
import ExerciseCard from '../components/ExerciseCard'; 
import './HomePage.css'; 
import { FaLock, FaTrophy  } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const { exercises, isLoading, error } = useExercises();
  const { user, isAuthenticated } = useAuth(); // Obtener el usuario del contexto

  console.log('ESTADO EN HOMEPAGE RENDER:', { isAuthenticated, progress: user?.progress });


  if (isLoading) return <Spinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="homepage-container">
      {isAuthenticated && user?.progress !== undefined && (
        <div className="progress-trophy">
          <FaTrophy className="trophy-icon" />
          <span className="trophy-text">
            {user.progress} / {exercises.length} Completados
          </span>
        </div>
      )}

      <h1 className="homepage-title">Selecciona un Ejercicio</h1>
      <p className="homepage-subtitle">Haz clic en una tarjeta para comenzar</p>
      
      <div className="exercise-grid">
        {exercises.map((exercise, index) => {
          // Lógica de desbloqueo
            const isLocked = isAuthenticated && user?.progress !== undefined 
            ? index > user.progress 
            : index > 0; // Si no está logueado, solo el primero está desbloqueado

          if (isLocked) {
            return (
              <div key={exercise.id} className="exercise-card locked">
                <div className="card-icon"><FaLock /></div>
                <span className="exercise-card-number">Ejercicio {index + 1}</span>
              </div>
            );
          }

          // Si no está bloqueado, muestra la tarjeta normal con el Link
          return <ExerciseCard key={exercise.id} exercise={exercise} index={index} />;
        })}
      </div>
    </div>
  );
}

export default HomePage;