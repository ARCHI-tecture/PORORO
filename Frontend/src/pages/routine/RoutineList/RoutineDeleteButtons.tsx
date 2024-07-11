import React from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { RoutineType } from '../RoutineType';

//CreateList에서 받아오는 props
interface RoutineDeleteButtonsProps {
  idToDelete: number;
  localRoutine: RoutineType[];
  setLocalRoutine: React.Dispatch<React.SetStateAction<RoutineType[]>>;
  categoryIndex: number;
}

export const RoutineDeleteButtons: React.FC<RoutineDeleteButtonsProps> = ({
  idToDelete,
  setLocalRoutine,
  categoryIndex,
}) => {
  const handleDelete = () => {
    // 로컬 스토리지에서 저장된 데이터 불러오기
    const routineDatas = localStorage.getItem('routineData');
    if (routineDatas) {
      try {
        const parsedRoutine: RoutineType[] = JSON.parse(routineDatas);

        // 삭제할 루틴을 제외한 데이터 필터링
        const updatedData = parsedRoutine.filter((routine) => routine.index !== idToDelete);
        console.log(updatedData );
        // 로컬 스토리지 업데이트
        localStorage.setItem('routineData', JSON.stringify(updatedData));

        // 화면에 출력될 데이터 필터링 및 상태 업데이트
        const filteredLocalRoutine = updatedData.filter(routine => routine.id === categoryIndex);
        setLocalRoutine(filteredLocalRoutine);
      } catch (error) {
        console.error('루틴 데이터를 파싱하는 도중 오류가 발생했습니다:', error);
      }
    } else {
      console.log('로컬 스토리지에서 루틴 데이터를 찾을 수 없습니다.');
    }
  };

  return (
    <div>
      <button className='text-gray-500 text-2xl' onClick={handleDelete}>
        <DeleteOutlinedIcon />
      </button>
    </div>
  );
};
