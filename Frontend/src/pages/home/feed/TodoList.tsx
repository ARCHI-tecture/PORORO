import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsBoxFill, BsFillPlusCircleFill } from 'react-icons/bs';
import TodoItem from './TodoItem';
import TodoCreate from './TodoCreate';
import { useTodoListStore } from '../todo';
import { NewTodo } from '../types';

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
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
  font-style: normal;
  font-weight: 800;
  line-height: normal;
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

interface Category {
  id: number;
  name: string;
  color: string;
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
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // 로컬 스토리지에서 카테고리 데이터 불러오기
    const storedCategories = JSON.parse(
      localStorage.getItem('categories') || '[]',
    );
    setCategories(storedCategories);
  }, []);

  const saveCategoriesToLocalStorage = (categories: Category[]) => {
    // 로컬 스토리지에 카테고리 데이터 저장
    localStorage.setItem('categories', JSON.stringify(categories));
  };

  const [newTodo, setNewTodo] = useState<NewTodo>({
    selectedDate: '',
    cateId: 0,
  });
  const todoList = useTodoListStore((state) => state.todoList);
  const selectedDate = useTodoListStore((state) => state.selectedDate);
  const targetData = todoList.find((data) => data.date === selectedDate);

  const addCategory = () => {
    // 새로운 카테고리 추가 예시
    const newCategory: Category = {
      id: categories.length + 1,
      name: '새로운 카테고리',
      color: '#000000',
    };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    saveCategoriesToLocalStorage(updatedCategories);
  };

  const addTodo = (date: string, cateId: number) => {
    setNewTodo({ selectedDate: date, cateId });
  };

  return (
    <TodoListContainer>
      {categories.map((category) => (
        <React.Fragment key={category.id}>
          {/* 카테고리 제목 */}
          <TodoCategoryButton
            onClick={() => addTodo(selectedDate, category.id)}
            title={category.name}
            color={category.color}
          />
          {/* 카테고리에 해당하는 투두리스트 */}
          {targetData &&
            targetData.todos
              .filter((todo) => todo.cateId === category.id)
              .map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  done={todo.done}
                  color={category.color}
                />
              ))}
          {/* 카테고리 제목에 해당하는 새로운 투두 만드는 input */}
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
