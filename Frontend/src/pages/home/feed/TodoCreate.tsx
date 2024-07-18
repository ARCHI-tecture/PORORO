import React, { useState } from 'react';
import { keyframes, styled } from 'styled-components';
import { useTodoListStore } from '../todo';
import { NewTodo } from '../types';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.8;
  }
`;

const TodoItemContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 4px;
`;

const CheckBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 32%;
  color: #fff;
  font-size: 14px;
  background: #d9d9d9;
`;

const InsertForm = styled.form<{ color: string }>`
  padding: 0 0 8px 0;
  border-bottom: 2px solid ${(props) => props.color};
  opacity: 0.8;
  width: 90%;

  animation-duration: 0.4s;
  animation-name: ${fadeIn};
`;

const Input = styled.input`
  padding: 0;
  width: 100%;
  box-sizing: border-box;
  border: none;
  outline: none;
  font-size: 18px;
  font-weight: 500;
`;

interface TodoCreateProps {
  newTodo: NewTodo;
  setNewTodo: (todo: NewTodo) => void;
  color: string;
}

const TodoCreate: React.FC<TodoCreateProps> = ({
  newTodo,
  setNewTodo,
  color,
}) => {
  const [value, setValue] = useState('');
  const { selectedDate, addTodo } = useTodoListStore((state) => ({
    selectedDate: state.selectedDate,
    addTodo: state.addTodo,
  }));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(selectedDate, newTodo.cateId, value);
    setNewTodo({ selectedDate: '', cateId: 0 });
    setValue('');
  };

  return (
    <TodoItemContainer>
      <CheckBox />
      <InsertForm onSubmit={onSubmit} color={color}>
        <Input
          autoFocus
          placeholder="할 일을 입력하세요"
          onChange={onChange}
          value={value}
        />
      </InsertForm>
    </TodoItemContainer>
  );
};

export default React.memo(TodoCreate);
