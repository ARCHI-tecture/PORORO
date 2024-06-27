import React, { useState } from 'react';

interface RoutineEditButtonsProps {
  initialRoutineName: string; // 초기 루틴 이름
  onUpdateRoutineName: (newRoutineName: string) => void;
}

export const RoutineEditButtons: React.FC<RoutineEditButtonsProps> = ({ initialRoutineName, onUpdateRoutineName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newRoutineName, setNewRoutineName] = useState(initialRoutineName);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRoutineName(event.target.value);
  };

  return (
    <>
      {isEditing ? (
        <>
          <input type="text" value={newRoutineName} onChange={handleInputChange} />
          <button onClick={handleSaveClick}>저장</button>
          <button onClick={handleCancelClick}>취소</button>
        </>
      ) : (
        <button onClick={handleEditClick}>수정</button>
      )}
    </>
  );
};
