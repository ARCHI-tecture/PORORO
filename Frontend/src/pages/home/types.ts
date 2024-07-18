export interface Todo {
  id: number;
  text: string;
  done: boolean;
  cateId: number;
}

export interface NewTodo {
  selectedDate: string;
  cateId: number;
}

export interface CalendarProps {
  currentDate: Date;
}

interface Category {
  id: number;
  name: string;
  color: string;
}
