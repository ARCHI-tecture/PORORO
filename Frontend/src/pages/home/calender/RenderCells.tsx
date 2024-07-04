import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  isSameMonth,
} from 'date-fns';
import uuid from 'react-uuid';
import { RenderCellsProps } from '../type';

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
  // 남은 날짜가 있을 경우 마지막 주에 추가합니다.
  if (week.length > 0) {
    dividedDates.push(week);
  }

  return (
    <div className="body">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
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

export default RenderCells;
