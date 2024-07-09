import React, { useState, useEffect, createContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

interface RoutineEditButtonsProps {
  initialRoutineName: string;
  onUpdateRoutineName: (newRoutineName: string) => void;
  routineIndex: number;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;

}

export const RoutineEditButtons: React.FC<RoutineEditButtonsProps> = ({
  routineIndex,
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

    const routineDataString = localStorage.getItem('routineData');
    if (!routineDataString) return;
    console.log(routineDataString);
    try {
      let routineDatas: {
        index: number; routineName: string;
      }[] = JSON.parse(routineDataString);

      const updatedRoutineDatas = routineDatas.map(routine => {
        console.log(routineIndex);
        console.log(routine);
        if (routine.index === routineIndex) {
          return { ...routine, routineName: newRoutineName };
        }
        return routine;
      });

      localStorage.setItem('routineData', JSON.stringify(updatedRoutineDatas));
      console.log(updatedRoutineDatas);
    } catch (error) {
      console.error('Error updating routine data:', error);
    }
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
