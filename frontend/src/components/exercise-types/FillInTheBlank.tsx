import { useState } from 'react';
import type { Option } from '../../types/exercise';
import './FillInTheBlank.css';

interface FillInTheBlankProps {
  options: Option[];
  onAnswerSubmit: (isCorrect: boolean) => void;
  disabled: boolean;
}

function FillInTheBlank({ options, onAnswerSubmit, disabled }: FillInTheBlankProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const correctAnswer = options[0]?.text || '';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  const checkAnswer = () => {
    if (disabled) return;
    const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
    onAnswerSubmit(isCorrect);
  };

  return (
    <div className="fill-in-the-blank-container">
      <input
        type="text"
        className="answer-input"
        value={userAnswer}
        onChange={handleInputChange}
        placeholder="Escribe tu respuesta aquí"
        disabled={disabled}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); checkAnswer(); } }}
      />
      {!disabled && (
         <button 
            type="button" 
            onClick={checkAnswer} 
            className="check-button"
            disabled={userAnswer.trim() === ''}
          >
            Comprobar
          </button>
      )}
    </div>
  );
}

export default FillInTheBlank;