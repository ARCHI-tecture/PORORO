import React, { useState } from 'react';
import styled from 'styled-components';
import { useTodoListStore, TodoItemModel } from '../todo';
import { IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { FaCheck } from 'react-icons/fa';

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
  editingId,
  editingText,
  onSave,
  onChange,
  cateId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleTodo = useTodoListStore((state) => state.toggleTodo);

  const handleEditClick = () => {
    setIsEditing(true);
    onEdit(id, text, cateId);
  };

  const handleSaveClick = () => {
    onSave(id);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const onToggle = () => toggleTodo(id);

  return (
    <TodoItemContainer>
      <CheckBox done={done} color={color} onClick={onToggle}>
        {done && <FaCheck />}
      </CheckBox>
      {isEditing ? (
        <TextField
          value={editingText}
          onChange={onChange}
          variant="standard"
          fullWidth
        />
      ) : (
        <Text>{text}</Text>
      )}
      <div>
        {isEditing ? (
          <>
            <IconButton onClick={handleSaveClick}>
              <SaveIcon />
            </IconButton>
            <IconButton onClick={handleCancelClick}>
              <CancelIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(id)}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </div>
    </TodoItemContainer>
  );
};

export default TodoItem;
