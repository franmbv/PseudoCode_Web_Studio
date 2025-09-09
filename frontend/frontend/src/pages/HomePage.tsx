// src/pages/HomePage.tsx (Versión con Cards)
import { useExercises } from '../context/ExerciseContext';
import Spinner from '../components/Spinner';
import ExerciseCard from '../components/ExerciseCard'; // <-- 1. Importar el nuevo componente
import './HomePage.css'; // <-- 2. Importar los nuevos estilos para la página

function HomePage() {
  const { exercises, isLoading, error } = useExercises();

  if (isLoading) return <Spinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Selecciona un Ejercicio</h1>
      <p className="homepage-subtitle">Haz clic en una tarjeta para comenzar</p>
      
      {/* 3. Reemplazamos la lista ul con un div para nuestra cuadrícula de tarjetas */}
      <div className="exercise-grid">
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
          ))
        ) : (
          <p>No hay ejercicios disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;