import { useState, useEffect } from 'react';
import type { Option } from '../../types/exercise';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type{ DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import './DragAndDrop.css';

interface DragAndDropProps {
  options: Option[];
  onAnswerSubmit: (isCorrect: boolean) => void;
  disabled: boolean;
}

// --- NUEVO: Función para barajar un array (Algoritmo Fisher-Yates) ---
const shuffleArray = (array: Option[]): Option[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Intercambio de elementos
  }
  return newArray;
};

function DragAndDrop({ options, onAnswerSubmit, disabled }: DragAndDropProps) {
  const [items, setItems] = useState<Option[]>([]);
  const sensors = useSensors(useSensor(PointerSensor));

  // MODIFICADO: Ahora barajamos las opciones al inicializar el componente
  useEffect(() => {
    setItems(shuffleArray(options));
  }, [options]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((currentItems) => {
        const oldIndex = currentItems.findIndex((item) => item.id === active.id);
        const newIndex = currentItems.findIndex((item) => item.id === over.id);
        return arrayMove(currentItems, oldIndex, newIndex);
      });
    }
  }

  const checkAnswer = () => {
    if (disabled) return;
    const currentOrderIds = items.map(item => item.id);
    // La lógica de comprobación no cambia: siempre se compara contra el orden de IDs ascendente
    const correctOrderIds = [...options].sort((a, b) => a.id - b.id).map(item => item.id);
    const isCorrect = JSON.stringify(currentOrderIds) === JSON.stringify(correctOrderIds);
    onAnswerSubmit(isCorrect);
  };

  return (
    <div className="drag-and-drop-container">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="droppable-area">
          <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
            {items.map(item => (
              <SortableItem key={item.id} id={item.id} text={item.text} disabled={disabled} />
            ))}
          </SortableContext>
        </div>
      </DndContext>
      
      {!disabled && (
        <div className="action-container-dnd">
          <button 
            type="button"
            onClick={checkAnswer} 
            className="check-button"
          >
            Comprobar Orden
          </button>
        </div>
      )}
    </div>
  );
}

export default DragAndDrop;