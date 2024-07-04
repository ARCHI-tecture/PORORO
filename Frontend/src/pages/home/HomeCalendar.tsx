import React, { useEffect, useRef, useState } from 'react';
import uuid from 'react-uuid';
import { format, addMonths, subMonths } from 'date-fns';
import RenderHeader from './calender/RenderHeader';
import RenderDays from './calender/RenderDays';
import RenderCells from './calender/RenderCells';

export const HomeCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const currentDate = new Date();

  let month = new Date(currentMonth);
  let months: any[] = [];
  const monthRef = useRef<HTMLDivElement>(null);

  for (let i = 0; i < 12; i++) {
    months.push(
      <div
        className="calendar__item"
        key={uuid()}
        ref={
          format(currentMonth, 'MM') === format(selectedDate, 'MM')
            ? monthRef
            : null
        }
      >
        <RenderHeader
          currentMonth={currentMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
        <RenderCells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={onDateClick}
        />
      </div>,
    );
    month = addMonths(currentMonth, 1);
  }

  useEffect(() => {
    if (monthRef.current !== null) {
      monthRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, []);

  const scrollCurrentMonth = () => {
    if (monthRef.current !== null) {
      monthRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="schedule-calendar">
      <div className="text-today">
        <p className="text-current" onClick={scrollCurrentMonth}>
          {currentDate.toLocaleString('en-US', { month: 'long' })}{' '}
          {format(currentDate, 'dd')}
        </p>
        <p className="text-year">{format(currentDate, 'yyyy')}</p>
      </div>
      <RenderDays />
      <div className="calendar-list">{months}</div>
    </div>
  );
};

export default HomeCalendar;
