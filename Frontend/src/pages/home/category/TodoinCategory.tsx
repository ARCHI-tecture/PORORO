import React, { useEffect, useState } from 'react';

// CategoryType 정의
type CategoryType = {
  id: number;
  name: string;
  todos: TodoType[];
};

// TodoType 정의
type TodoType = {
  id: number;
  text: string;
  completed: boolean;
};

// 초기 카테고리 정의
const initialCategory: CategoryType[] = [
  { id: 1, name: 'Initial Category', todos: [] },
];

const TodoinCategory: React.FC = () => {
  const [localCategory, setLocalCategory] = useState<CategoryType[]>(
    initialCategory,
  );
  const [newTodoText, setNewTodoText] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    try {
      const Categorys = localStorage.getItem('categoryArr');
      if (Categorys) {
        const parsedCategories: CategoryType[] = JSON.parse(Categorys);
        setLocalCategory(parsedCategories);
      } else {
        setLocalCategory(initialCategory);
      }
    } catch (error) {
      console.log('Error loading categories from localStorage:', error);
      setLocalCategory(initialCategory);
    }
  }, []);

  const addTodo = (categoryId: number, todoText: string) => {
    setLocalCategory((prevCategories) => {
      const updatedCategories = prevCategories.map((category) => {
        if (category.id === categoryId) {
          const newTodo: TodoType = {
            id: Date.now(),
            text: todoText,
            completed: false,
          };
          return {
            ...category,
            todos: [...category.todos, newTodo],
          };
        }
        return category;
      });
      localStorage.setItem('categoryArr', JSON.stringify(updatedCategories));
      return updatedCategories;
    });
  };

  return (
    <div>
      <h1>TodoinCategory</h1>
      {localCategory && localCategory.length > 0 ? (
        localCategory?.map((category) => (
          <div key={category.id}>
            <h2>{category.name}</h2>
            <ul>
              {category.todos.map((todo) => (
                <li key={todo.id}>
                  <span>{todo.text}</span>
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="New Todo"
              value={selectedCategoryId === category.id ? newTodoText : ''}
              onChange={(e) => {
                setSelectedCategoryId(category.id);
                setNewTodoText(e.target.value);
              }}
            />
            <button onClick={() => addTodo(category.id, newTodoText)}>
              Add Todo
            </button>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TodoinCategory;
