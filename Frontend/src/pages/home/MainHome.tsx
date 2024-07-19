import React from 'react';
import styled from 'styled-components';
import TodoList from './feed/TodoList';
import Buttons from './button/Buttons';
import TodoCalendar from './calendar/TodoCalender';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  padding: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
`;

const MainHome: React.FC = () => {
  return (
    <MainContainer>
      <TodoCalendar />
      <TodoList />
      <Buttons />
    </MainContainer>
  );
};

export default MainHome;
