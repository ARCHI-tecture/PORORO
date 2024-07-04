export interface HomeCalendarProps {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}

export interface RenderCellsProps {
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: (day: Date) => void;
}
