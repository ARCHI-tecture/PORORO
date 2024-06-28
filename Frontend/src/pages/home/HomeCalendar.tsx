import React, { useEffect, useRef } from 'react';
import { format, addMonths, startOfMonth } from 'date-fns';
import uuid from 'react-uuid';
import Header from './Calendar/Header';
import Days from './Calendar/Days';
import Cells from './Calendar/Cells';

import 'tailwindcss/tailwind.css'; // Import tailwindCSS

const HomeCalendar: React.FC = () => {
  const currentDate = new Date();
  const selectedDate = new Date();

  let currentMonth = new Date(format(currentDate, 'yyyy'));
  let months: JSX.Element[] = [];

  const monthRef = useRef<HTMLDivElement>(null);

  for (let i = 0; i < 12; i++) {
    months.push(
      <div
        className="calendar__item p-4 rounded-lg border border-gray-200 shadow-md"
        key={uuid()}
        ref={
          format(currentMonth, 'MM') === format(selectedDate, 'MM')
            ? monthRef
            : null
        }
      >
        <Header currentMonth={currentMonth} />
        <Days />
        <Cells currentMonth={currentMonth} selectedDate={selectedDate} />
      </div>,
    );
    currentMonth = addMonths(currentMonth, 1);
  }

  useEffect(() => {
    if (monthRef.current !== null) {
      monthRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, []);

  function scrollCurrentMonth() {
    if (monthRef.current !== null) {
      monthRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="schedule-calendar flex flex-col items-center w-full max-w-screen-lg mx-auto p-8">
      <div className="text-today mb-8 text-center">
        <p className="text-current cursor-pointer" onClick={scrollCurrentMonth}>
          {currentDate.toLocaleString('en-US', { month: 'long' })}{' '}
          {format(currentDate, 'dd')}
        </p>
        <p className="text-year">{format(currentDate, 'yyyy')}</p>
      </div>
      <div className="calendar-list grid grid-cols-3 gap-4">{months}</div>
    </div>
  );
};

export default HomeCalendar;
