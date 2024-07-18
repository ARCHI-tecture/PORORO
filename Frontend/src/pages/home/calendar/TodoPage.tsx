import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import TodoList from '../feed/TodoList';

const TodoPageContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const TodoPage: React.FC = () => {
  const { date } = useParams<{ date: string }>();

  return (
    <TodoPageContainer>
      <h1>{date}의 할 일 목록</h1>
      <TodoList />
    </TodoPageContainer>
  );
};

export default TodoPage;
