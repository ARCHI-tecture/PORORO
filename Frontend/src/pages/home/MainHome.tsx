import React from 'react';
import styled from 'styled-components';
import TodoList from './TodoList';
import TodoCalendar from './Todocalender';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px; /* 간격 설정 */
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