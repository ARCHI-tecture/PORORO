export type HomeCalendarProps = {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
};

export type RenderCellsProps = {
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: (day: Date) => void;
};
