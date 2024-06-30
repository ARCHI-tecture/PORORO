import React, { useState } from 'react';
import dayjs from 'dayjs';

interface RenderCalendarBoardProps {
  selectedDay: string;
  handleSelectDate: (v: string) => void;
}

const RenderCalendarBoard: React.FC<RenderCalendarBoardProps> = ({
  selectedDay,
  handleSelectDate,
}) => {
  const initArr = (firstDay: number, daysInMonth: number) => {
    return Array.from({ length: firstDay + daysInMonth }, (v, i) =>
      i < firstDay
        ? null
        : dayjs(selectedDay)
            .startOf('month')
            .set('date', i - firstDay + 1)
            .format('MM/DD/YY'),
    );
  };

  const [arr, setArr] = useState<(string | null)[]>([null]);

  React.useEffect(() => {
    const firstDay = dayjs(selectedDay).startOf('month').day();
    const daysInMonth = dayjs(selectedDay).daysInMonth();
    setArr(initArr(firstDay, daysInMonth));
  }, [selectedDay]);

  const Item: React.FC<{ isSelected: boolean }> = ({
    isSelected,
    children,
  }) => (
    <div className={`item ${isSelected ? 'selected' : ''}`}>{children}</div>
  );

  const content = arr.map((v, i) => (
    <Item key={v ? v.toString() : `${v}${i}`} isSelected={selectedDay === v}>
      {v && (
        <div onClick={() => handleSelectDate(v)}>
          {/* TodoCheck와 날짜를 표시할 부분에 대한 수정이 필요 */}
          <span>{dayjs(v).date()}</span>
        </div>
      )}
    </Item>
  ));

  return <>{content}</>;
};

const HomeCalendar = () => {
  const [selectedDay, setSelectedDay] = useState<string>(
    dayjs().format('MM/DD/YY'),
  );

  const handleSelectDate = (v: string) => {
    setSelectedDay(v);
  };

  return (
    <div>
      <h1>Calendar</h1>
      <RenderCalendarBoard
        selectedDay={selectedDay}
        handleSelectDate={handleSelectDate}
      />
    </div>
  );
};

export default HomeCalendar;
