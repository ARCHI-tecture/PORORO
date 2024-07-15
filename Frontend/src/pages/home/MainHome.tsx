import React from 'react';
import styled from 'styled-components';
import TodoList from './feed/TodoList';
import TodoCalendar from './calendar/TodoCalender';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start; /* 좌측 정렬 */
  gap: 10px; /* 간격 줄이기 */
  width: 100%; /* 전체 너비 사용 */
  padding: 16px; /* 여백 추가 */
`;

const MainHome: React.FC = () => {
  return (
    <MainContainer>
      <TodoCalendar />
      <TodoList />
    </MainContainer>
  );
};

export default MainHome;
