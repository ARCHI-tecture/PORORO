import React from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

interface RoutineDeleteButtonsProps {
  idToDelete: number; // 삭제할 데이터의 인덱스
  onDelete: (idToDelete: number) => void; // 삭제 버튼 클릭 시 호출할 함수
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
