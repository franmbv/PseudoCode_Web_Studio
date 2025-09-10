// src/components/ExerciseCard.tsx (Versión con Iconos)
import { Link } from 'react-router-dom';
import type { Exercise } from '../types/exercise';
// 1. Importamos los iconos que queremos usar de la librería
import { FaPencilAlt, FaBookOpen, FaCheckSquare } from 'react-icons/fa';
import './ExerciseCard.css';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

// 2. Creamos un array con nuestros componentes de icono
const icons = [FaPencilAlt, FaBookOpen, FaCheckSquare];

function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  // 3. Seleccionamos un icono del array de forma rotativa
  // El operador de módulo (%) asegura que siempre elijamos un índice válido (0, 1, 2, 0, 1, 2...)
  const IconComponent = icons[index % icons.length];

  return (
    <Link to={`/exercise/${exercise.id}`} className="exercise-card-link">
      <div className="exercise-card">
        {/* 4. Mostramos el icono seleccionado */}
        <div className="card-icon">
          <IconComponent />
        </div>
        <span className="exercise-card-number">Ejercicio {index + 1}</span>
      </div>
    </Link>
  );
}

export default ExerciseCard;