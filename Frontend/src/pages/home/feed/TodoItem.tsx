import React, { useState } from 'react';
import styled from 'styled-components';
import { useTodoListStore } from '../todo';
import { IconButton } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // 추가된 부분
import TodoModal from './ButtonModal';

const TodoItemContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 4px;
`;

const CheckBox = styled.div<{ done: boolean; color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 32%;
  color: #fff;
  font-size: 14px;
  background: ${(props) => (props.done ? props.color : '#D9D9D9')};
  cursor: pointer;
`;

const Text = styled.div`
  flex: 1;
  color: #000;
  font-size: 18px;
  font-weight: 500;
`;

interface TodoItemProps {
  id: string;
  text: string;
  done: boolean;
  color: string;
  onEdit: (id: string, text: string, cateId: number) => void;
  onDelete: (id: string) => void;
  editingId: string | null;
  editingText: string;
  onSave: (id: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cateId: number;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  done,
  color,
  onEdit,
  onDelete,
  editingText,
  onSave,
  onChange,
  cateId,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggleTodo = useTodoListStore((state) => state.toggleTodo);

  const onToggle = () => toggleTodo(id);

  const handleOpenModal = () => {
    onEdit(id, text, cateId);
    setOpen(true);
  };

  const handleTimerClick = () => {
    navigate('/pomodoro'); // Navigate to the timer screen
  };

  return (
    <>
      <TodoItemContainer>
        <CheckBox done={done} color={color} onClick={onToggle}>
          {done && <FaCheck />}
        </CheckBox>
        <Text>{text}</Text>
        <div onClick={handleTimerClick}>
          <TimerIcon />
        </div>
        <IconButton onClick={handleOpenModal}>
          <LinearScaleIcon />
        </IconButton>
      </TodoItemContainer>

      <TodoModal
        open={open}
        onClose={() => setOpen(false)}
        editingText={editingText}
        onChange={onChange}
        onSave={() => {
          onSave(id);
          setOpen(false);
        }}
        onDelete={() => {
          onDelete(id);
          setOpen(false);
        }}
      />
    </>
  );
};

export default TodoItem;
