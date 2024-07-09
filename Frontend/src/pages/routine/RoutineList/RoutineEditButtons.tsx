import React, { useState, useEffect, createContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

interface RoutineEditButtonsProps {
  initialRoutineName: string;
  onUpdateRoutineName: (newRoutineName: string) => void;

  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;

}

export const RoutineEditButtons: React.FC<RoutineEditButtonsProps> = ({
  initialRoutineName,
  onUpdateRoutineName,
  isEditing,
  setIsEditing,
}) => {
  const [newRoutineName, setNewRoutineName] = useState(initialRoutineName);

  useEffect(() => {
    setNewRoutineName(initialRoutineName);
  }, [initialRoutineName]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewRoutineName(initialRoutineName);
  };

  const handleSaveClick = () => {
    onUpdateRoutineName(newRoutineName);
    setIsEditing(false);

  };

  return (
    <>
      {isEditing ? (
        <div className=' space-x-2'>
          <IconButton onClick={handleSaveClick}><CheckIcon /></IconButton>
          <IconButton onClick={handleCancelClick}><CloseIcon /></IconButton>
        </div>
      ) : (
        <IconButton onClick={handleEditClick}>
          <EditIcon/>
        </IconButton>
      )}
    </>
  );
};
