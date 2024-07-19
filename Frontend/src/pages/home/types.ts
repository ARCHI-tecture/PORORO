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

export interface Routine {
  routineName: string;
  dateRange: any;
  id: number;
  index: any;
  cateId: number;
  text: string;
  date: [string, string]; // 여기에 date 속성을 추가하세요.
}
