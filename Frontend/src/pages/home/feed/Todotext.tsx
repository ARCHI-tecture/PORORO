import React from 'react';
import styled from 'styled-components';

interface TodoTextProps {
  done: boolean;
  color: string;
  children: React.ReactNode;
}

const StyledTodoText = styled.div<TodoTextProps>`
  color: ${(props) => (props.done ? '#999' : props.color)};
  text-decoration: ${(props) => (props.done ? 'line-through' : 'none')};
`;

const TodoText: React.FC<TodoTextProps> = ({ done, color, children }) => {
  return (
    <StyledTodoText done={done} color={color}>
      {children}
    </StyledTodoText>
  );
};

export default TodoText;
