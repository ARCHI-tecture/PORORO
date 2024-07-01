import React, { useEffect, useState } from 'react';
import { RoutineType } from './RoutineType';
import dayjs from 'dayjs';
import { RoutineDeleteButtons } from './RoutineDeleteButtons';
import { RoutineEditButtons } from './RoutineEditButtons';

interface RoutineCreateListProps {
  categoryIndex: number;
}

export const RoutineCreateList: React.FC<RoutineCreateListProps> = ({ categoryIndex }) => {
  const [localRoutine, setLocalRoutine] = useState<RoutineType[]>([]);

  useEffect(() => {
    try {
      const routineDatas = localStorage.getItem('routineData');
      if (routineDatas) {
        const parsedRoutine: RoutineType[] = JSON.parse(routineDatas);
        setLocalRoutine(parsedRoutine);
      }
    } catch (error) {
      console.error('루틴 데이터를 불러오는 도중 오류가 발생했습니다:', error);
    }
  }, []);

  const handleDeleteRoutine = (indexToDelete: number) => {
    // indexToDelete에 해당하는 데이터를 삭제하는 로직 구현
    const updatedData = localRoutine.filter((item, index) => index !== indexToDelete);

    localStorage.setItem('routineData', JSON.stringify(updatedData));

    console.log('Deleted data at index:', indexToDelete);
    console.log('Updated data:', updatedData);

    setLocalRoutine(updatedData);
  };

  const [routines, setRoutines] = useState<RoutineType[]>();

  const handleUpdateRoutineName = (index: number, newRoutineName: string) => {
    const updatedRoutines = localRoutine.map((routine, idx) =>
      idx === index ? { ...routine, routineName: newRoutineName } : routine
    );
    setLocalRoutine(updatedRoutines); // setRoutines 대신 setLocalRoutine으로 변경
  };

  return (
    <div>
      {localRoutine.length > 0 ? (
        localRoutine.map((routine, index) => (
          <div key={index}>
            <div>{routine.routineName}</div>
            <div>
              {routine.dateRange.map(date => date ? dayjs(date).format('YYYY-MM-DD') : 'N/A').join(' ~ ')}
            </div>
            <RoutineDeleteButtons idToDelete={index} onDelete={handleDeleteRoutine} />
            <RoutineEditButtons
            initialRoutineName={routine.routineName}
            onUpdateRoutineName={(newRoutineName) => handleUpdateRoutineName(index, newRoutineName)}
          />
          </div>
        ))
      ) : (
        <div>루틴이 없습니다.</div>
      )}
    </div>
  );
};
