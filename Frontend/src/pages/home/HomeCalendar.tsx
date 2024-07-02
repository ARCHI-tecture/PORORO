import React, { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
} from 'date-fns';
import { HomeCalendarProps, RenderCellsProps } from './type';

const HomeCalendar: React.FC<HomeCalendarProps> = ({
  currentMonth,
  prevMonth,
  nextMonth,
}) => {
  return (
    <div className="header row flex justify-between items-center p-2">
      <div className="col col-start">
        <span className="text">
          <span className="text month">{format(currentMonth, 'M')}월</span>
          {format(currentMonth, 'yyyy')}
        </span>
      </div>
      <div className="col col-end flex justify-between">
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={prevMonth}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={nextMonth}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const RenderCells: React.FC<RenderCellsProps> = ({
  currentMonth,
  selectedDate,
  onDateClick,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  // 날짜를 7개씩 자르고 2차원 배열로 만듭니다.
  const dividedDates: Date[][] = [];
  let week: Date[] = [];
  let day = startDate;

  while (day <= endDate) {
    week.push(day);
    if (week.length === 7) {
      dividedDates.push(week);
      week = [];
    }
    day = addDays(day, 1);
  }

  // 현재 달력의 행 수를 계산합니다.
  const numWeeks = dividedDates.length;

  return (
    <div className="body">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'].map(
              (day, index) => (
                <th key={index} className="p-2 border border-gray-300">
                  {day}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {dividedDates.map((week, rowIndex) => (
            <tr key={rowIndex}>
              {week.map((date, colIndex) => {
                const formattedDate = format(date, 'd');
                const isCurrentMonth = isSameMonth(date, monthStart);
                const isCurrentDay = isSameDay(date, selectedDate);

                let cellClassNames = 'p-2 border border-gray-300 text-center';
                if (!isCurrentMonth) {
                  cellClassNames += ' text-gray-400';
                } else if (isCurrentDay) {
                  cellClassNames += ' bg-blue-500 text-white';
                } else if (format(currentMonth, 'M') !== format(date, 'M')) {
                  cellClassNames += ' text-gray-400';
                } else {
                  cellClassNames += ' hover:bg-gray-200 cursor-pointer';
                }

                return (
                  <td
                    key={date.getTime()}
                    className={cellClassNames}
                    onClick={() => onDateClick(date)}
                  >
                    <span className={isCurrentMonth ? '' : 'text-gray-400'}>
                      {formattedDate}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Calendar: React.FC = () => {
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

  return (
    <div className="calendar p-4">
      <HomeCalendar
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
      />
    </div>
  );
};
