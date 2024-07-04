import React from 'react';
import { format } from 'date-fns';
import { HomeCalendarProps } from '../type';

const RenderHeader: React.FC<HomeCalendarProps> = ({
  currentMonth,
  prevMonth,
  nextMonth,
}) => {
  return (
    <div className="header row flex justify-between items-center p-2">
      <div className="col col-start">
        <span className="text relative">
          <span className="text month absolute top-0 left-0">
            {format(currentMonth, 'yyyy')}년
          </span>
          {format(currentMonth, 'M')}월
        </span>
      </div>
      <div className="flex items-center justify-center">
        <button onClick={prevMonth}>이전</button>
        <button onClick={nextMonth}>다음</button>
      </div>
    </div>
  );
};

export default RenderHeader;
