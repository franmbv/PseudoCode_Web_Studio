import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './DragAndDrop.css'; // Reutilizaremos los mismos estilos

interface SortableItemProps {
  id: number;
  text: string;
  disabled: boolean;
}

export function SortableItem(props: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id, disabled: props.disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const className = `draggable-item ${isDragging ? 'dragging' : ''} ${props.disabled ? 'disabled' : ''}`;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={className}>
      {props.text}
    </div>
  );
}