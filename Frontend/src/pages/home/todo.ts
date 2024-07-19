import { create } from 'zustand';
import uuid from 'react-uuid';
import { todoData } from './data';

export type TodoItemModel = {
  id: string;
  cateId: number;
  text: string;
  done: boolean;
};

export type TodoListModel = {
  date: string;
  todos: TodoItemModel[];
};

type TodoListStore = {
  todoList: TodoListModel[];
  selectedDate: string;
  setDate: (date: string) => void;
  addTodo: (date: string, cateId: number, text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
  saveTodo: (id: string, newText: string) => void;
};

export const useTodoListStore = create<TodoListStore>((set) => ({
  todoList: todoData,
  selectedDate: new Date().toLocaleDateString(),
  setDate: (date) => set((state) => ({ ...state, selectedDate: date })),
  addTodo: (date, cateId, text) =>
    set((state) => {
      const targetData = state.todoList.find((data) => data.date === date);
      if (targetData) {
        targetData.todos.push({ id: uuid(), cateId, text, done: false });
      } else {
        state.todoList.push({
          date,
          todos: [{ id: uuid(), cateId, text, done: false }],
        });
      }
      return { ...state };
    }),
  toggleTodo: (id) =>
    set((state) => ({
      ...state,
      todoList: state.todoList.map((data) => ({
        ...data,
        todos: data.todos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo,
        ),
      })),
    })),
  deleteTodo: (id) =>
    set((state) => {
      const updatedTodos = state.todoList.map((data) => {
        if (data.date === state.selectedDate) {
          return {
            ...data,
            todos: data.todos.filter((todo) => todo.id !== id),
          };
        }
        return data;
      });
      return { ...state, todoList: updatedTodos };
    }),
  editTodo: (id, newText) =>
    set((state) => ({
      ...state,
      todoList: state.todoList.map((data) => ({
        ...data,
        todos: data.todos.map((todo) =>
          todo.id === id ? { ...todo, text: newText } : todo,
        ),
      })),
    })),
  saveTodo: (id, newText) =>
    set((state) => ({
      ...state,
      todoList: state.todoList.map((data) => ({
        ...data,
        todos: data.todos.map((todo) =>
          todo.id === id ? { ...todo, text: newText } : todo,
        ),
      })),
    })),
}));
