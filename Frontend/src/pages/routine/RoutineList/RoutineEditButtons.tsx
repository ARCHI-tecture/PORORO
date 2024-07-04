import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';

interface RoutineEditButtonsProps {
  initialRoutineName: string;
  onUpdateRoutineName: (newRoutineName: string) => void;
  routineIndex: number;
}

export const RoutineEditButtons: React.FC<RoutineEditButtonsProps> = ({ routineIndex, initialRoutineName, onUpdateRoutineName }) => {
  const [isEditing, setIsEditing] = useState(false);
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
        if (routine.index === routineIndex) {
          return { ...routine, routineName: newRoutineName };
        }
        return routine;
      });

      localStorage.setItem('routineData', JSON.stringify(updatedRoutineDatas));
      console.log(updatedRoutineDatas);
    } catch (error) {

    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRoutineName(event.target.value);
  };

  return (
    <>
      {isEditing ? (
        <div className=' space-x-2'>
          <input
            className='border-b-2 border-black '
            type="text" value={newRoutineName} onChange={handleInputChange} />
          <IconButton onClick={handleSaveClick}><LibraryAddOutlinedIcon /></IconButton>
          <IconButton onClick={handleCancelClick}><CloseIcon /></IconButton>
        </div>
      ) : (
        <IconButton onClick={handleEditClick}>
          <EditIcon />
        </IconButton>
      )}
    </>
  );
};
