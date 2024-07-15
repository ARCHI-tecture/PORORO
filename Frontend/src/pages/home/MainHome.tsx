import React from 'react';
import styled from 'styled-components';
import TodoList from './feed/TodoList';
import TodoCalendar from './calendar/TodoCalender';
import Buttons from './button/Buttons';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  padding: 16px;
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
