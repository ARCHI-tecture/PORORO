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
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows: any[] = [];
  let days: any[] = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? 'disabled'
              : isSameDay(day, selectedDate)
                ? 'selected'
                : 'not-valid'
          }`}
          key={uuid()}
        >
          <span
            className={
              format(currentMonth, 'M') !== format(day, 'M')
                ? 'text not-valid'
                : isSameMonth(day, monthStart) && isSameDay(day, selectedDate)
                  ? 'text today'
                  : ''
            }
          >
            {formattedDate}
          </span>
        </div>,
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={uuid()}>
        {days}
      </div>,
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
};

export default RenderCells;
