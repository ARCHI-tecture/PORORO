import React, { useState } from 'react';
import styled from 'styled-components';
import { BsBoxFill, BsFillPlusCircleFill } from 'react-icons/bs';
import TodoItem from './TodoItem';
import TodoCreate from './TodoCreate';
import { useTodoListStore, TodoItemModel } from '../todo';
import { NewTodo } from '../types';

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  width: 100%; /* 전체 너비 사용 */
  align-items: flex-start; /* 좌측 정렬 */
`;

const TodoCategoryContainer = styled.div`
  padding: 12px 0;
`;

const TodoCategoryBlock = styled.div`
  display: inline-flex;
  padding: 10px 10px 10px 14px;
  align-items: center;
  gap: 8px;
  border-radius: 21px;
  background: #f2f2f2;
  font-size: 16px;
  font-weight: 800;
  color: #d9d9d9;
  cursor: pointer;
`;

const TodoCategory = styled.div`
  color: ${(props) => props.color};
`;

interface TodoCategoryButtonProps {
  title: string;
  color: string;
  onClick: () => void;
}

function TodoCategoryButton({
  title,
  color,
  onClick,
}: TodoCategoryButtonProps) {
  return (
    <TodoCategoryContainer>
      <TodoCategoryBlock onClick={onClick}>
        <BsBoxFill />
        <TodoCategory color={color}>{title}</TodoCategory>
        <BsFillPlusCircleFill />
      </TodoCategoryBlock>
    </TodoCategoryContainer>
  );
}

function TodoList() {
  const [newTodo, setNewTodo] = useState<NewTodo>({
    selectedDate: '',
    cateId: 0,
  });

  const todoList = useTodoListStore((state) => state.todoList);
  const selectedDate = useTodoListStore((state) => state.selectedDate);
  const targetData = todoList.find((data) => data.date === selectedDate);

  const categoryListStr = localStorage.getItem('categoryArr');
  const categoryList = categoryListStr ? JSON.parse(categoryListStr) : [];

  const [editingData, setEditingData] = useState<{
    id: string | null;
    text: string;
    cateId: number | null;
  }>({ id: null, text: '', cateId: null });

  const addTodo = (date: string, cateId: number) => {
    setNewTodo({ selectedDate: date, cateId });
  };

  const handleDelete = (id: string) => {
    useTodoListStore.getState().deleteTodo(id);
  };

  const handleEdit = (id: string, text: string, cateId: number) => {
    setEditingData({ id, text, cateId });
  };

  const handleSave = (id: string) => {
    useTodoListStore.getState().saveTodo(id, editingData.text);
    setEditingData({ id: null, text: '', cateId: null });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingData((prev) => ({ ...prev, text: e.target.value }));
  };

  return (
    <TodoListContainer>
      {categoryList.map((category: any) => (
        <React.Fragment key={category.id}>
          <TodoCategoryButton
            onClick={() => addTodo(selectedDate, category.id)}
            title={category.category}
            color={category.color}
          />
          {targetData &&
            targetData.todos
              .filter((todo) => todo.cateId === category.id)
              .map((todo: TodoItemModel) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  done={todo.done}
                  color={category.color}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  editingId={editingData.id}
                  editingText={editingData.text}
                  onSave={handleSave}
                  onChange={handleChange}
                  cateId={category.id}
                />
              ))}
          {newTodo.selectedDate === selectedDate &&
            newTodo.cateId === category.id && (
              <TodoCreate
                newTodo={newTodo}
                setNewTodo={setNewTodo}
                color={category.color}
              />
            )}
        </React.Fragment>
      ))}
    </TodoListContainer>
  );
}

export default TodoList;
