import { Link } from 'react-router-dom';
import type { Exercise } from '../types/exercise';
import { FaPencilAlt, FaBookOpen, FaCheckSquare } from 'react-icons/fa';
import './ExerciseCard.css';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

const icons = [FaPencilAlt, FaBookOpen, FaCheckSquare];

function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  const IconComponent = icons[index % icons.length];

  return (
    <Link to={`/exercise/${exercise.id}`} className="exercise-card-link">
      <div className="exercise-card">
        <div className="card-icon">
          <IconComponent />
        </div>
        <span className="exercise-card-number">Ejercicio {index + 1}</span>
      </div>
    </Link>
  );
}

export default ExerciseCard;