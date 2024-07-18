import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsBoxFill, BsFillPlusCircleFill } from 'react-icons/bs';
import TodoItem from './TodoItem';
import TodoCreate from './TodoCreate';
import { useTodoListStore, TodoItemModel } from '../todo';
import { NewTodo, Routine } from '../types';

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  margin-top: 23px;
  width: 100%;
  align-items: flex-start;
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
  // const targetData = todoList.find(
  //   (data) =>
  //     `${data.date.split('.')[1].trim()}/${data.date.split('.')[2].trim()}/${
  //       data.date.split('.')[0]
  //     }` === selectedDate,
  // );

  //카테고리 로컬스토리지 불러오는 코드
  const categoryListStr = localStorage.getItem('categoryArr');
  const categoryList = categoryListStr ? JSON.parse(categoryListStr) : [];

  //루틴 로컬스토리지 불러오는 코드
  const routineListStr = localStorage.getItem('routineData');
  const routineList = routineListStr ? JSON.parse(routineListStr) : [];

  const [editingData, setEditingData] = useState<{
    id: string | null;
    text: string;
    cateId: number | null;
  }>({ id: null, text: '', cateId: null });

  useEffect(() => {
    //루틴 로컬 스토리지에 dateRange 파싱하는 코드
    const dateRange = JSON.parse(localStorage.getItem('dateRange') || '[]');
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);

    routineList.forEach((routine: Routine) => {
      const routineDate = new Date(selectedDate);
      if (routineDate >= startDate && routineDate <= endDate) {
        if (
          targetData &&
          !targetData.todos.some((todo) => todo.cateId === routine.id)
        ) {
          useTodoListStore
            .getState()
            .addTodo(selectedDate, routine.id, routine.text);
        }
      }
    });
  }, [selectedDate, routineList, targetData]);

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
        <React.Fragment>
          <TodoCategoryButton
            key={category.id}
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
          {/* {routineList.map((routine: any) => {
            console.log(routine);
          })} */}
        </React.Fragment>
      ))}
    </TodoListContainer>
  );
}

export default TodoList;
