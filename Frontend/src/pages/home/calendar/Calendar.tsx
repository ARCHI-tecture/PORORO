import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { useTodoListStore } from '../todo';
import { CalendarProps } from '../types';

const days = ['월', '화', '수', '목', '금', '토', '일'];

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 12px;
  width: 100%;
  max-width: 600px;
  overflow-x: hidden;
`;

const CalendarDay = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 10px;
  color: #525252;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
`;

const TodoDayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 6px;
`;

const TodoDayCheck = styled.div<{ $colored: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 32%;
  cursor: pointer;
  background-color: ${(props) => (props.$colored ? '#5F8B58' : '#D9D9D9')};
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
`;

const TodoDayDate = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  border-radius: 14px;
  color: ${(props) => (props.selected ? '#FFF' : '#000')};
  background-color: ${(props) => (props.selected ? '#5983FC' : '#FFF')};
  cursor: pointer; /* 클릭 가능하도록 커서 스타일 추가 */
`;

export interface CalendarDate {
  fullDate: string;
  date: string | null;
  remains: number;
  length: number;
}

function TodoDay({ fullDate, date, remains, length }: CalendarDate) {
  const navigate = useNavigate();
  const setDate = useTodoListStore((state) => state.setDate);
  const selectedDate = useTodoListStore((state) => state.selectedDate);

  const onDayClick = () => {
    if (fullDate !== '') {
      setDate(fullDate);
      navigate(`/`);
    }
  };

  return (
    <TodoDayContainer>
      {date !== '' && (
        <>
          <TodoDayCheck $colored={length - remains > 0}>
            {remains === 0 && length > 0 ? (
              <FaCheck />
            ) : (
              `${length !== 0 ? remains : ''}`
            )}
          </TodoDayCheck>
          <TodoDayDate
            selected={fullDate === selectedDate}
            onClick={onDayClick}
          >
            {date}
          </TodoDayDate>
        </>
      )}
    </TodoDayContainer>
  );
}

const Calendar: React.FC<CalendarProps> = ({ currentDate }) => {
  const todoList = useTodoListStore((state) => state.todoList);
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );
  const firstDayOfWeek = firstDay.getDay();
  const leadingEmptyDays = (firstDayOfWeek + 6) % 7; // 월요일 시작으로 맞추기 위해 +6 후 % 7

  const calendarDates: CalendarDate[] = [];

  // 첫 주의 빈 네모 박스를 채우기 위한 루프
  for (let i = 0; i < leadingEmptyDays; i++) {
    calendarDates.push({
      fullDate: '',
      date: null,
      remains: 0,
      length: 0,
    });
  }

  for (let i = 1; i <= lastDay.getDate(); i += 1) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    const dateString = date.toLocaleDateString();
    const targetTodos = todoList.find((todo) => todo.date === dateString);

    let remains = 0;
    let length = 0;
    if (targetTodos) {
      remains = targetTodos.todos.filter((todo) => !todo.done).length;
      length = targetTodos.todos.length;
    }
    calendarDates.push({
      fullDate: dateString,
      date: i.toString(),
      remains,
      length,
    });
  }

  return (
    <CalendarContainer>
      <CalendarDay>
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </CalendarDay>
      <CalendarGrid>
        {calendarDates.map((day, index) => (
          <TodoDay
            key={index}
            fullDate={day.fullDate}
            date={day.date}
            remains={day.remains}
            length={day.length}
          />
        ))}
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default React.memo(Calendar);
