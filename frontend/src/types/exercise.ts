export interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface Exercise {
  id: number;
  title: string;
  statement: string;
  exerciseType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_IN_THE_BLANK' | 'DRAG_AND_DROP';
  codeSnippet: string | null;
  options: Option[];
}