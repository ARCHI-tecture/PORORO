import React from 'react';
import { format } from 'date-fns';
import { HomeCalendarProps } from '../type';
import { Icon } from '@iconify/react';

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
      {/*수평정렬된 이전, 다음 버튼*/}
      <div className="flex items-center justfy-center">
        <Icon
          icon="bi:arrow-left-circle-fill"
          onClick={prevMonth}
          className="w-6 h-6"
        />
        <Icon
          icon="bi:arrow-right-circle-fill"
          onClick={nextMonth}
          className="w-6 h-6 ml-4"
        />
      </div>
    </div>
  );
};

export default RenderHeader;
