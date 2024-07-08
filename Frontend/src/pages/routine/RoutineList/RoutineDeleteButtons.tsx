import React from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

interface RoutineDeleteButtonsProps {
  idToDelete: number;
  onDelete: (indexToDelete: number) => void;
}

export const RoutineDeleteButtons: React.FC<RoutineDeleteButtonsProps> = ({ idToDelete, onDelete }) => {
  const handleDelete = () => {
    onDelete(idToDelete);
  };

  return (
    <div>
      <button
        className='text-gray-500 text-2xl'
        onClick={handleDelete}><DeleteOutlinedIcon /></button>
    </div>
  );
};
