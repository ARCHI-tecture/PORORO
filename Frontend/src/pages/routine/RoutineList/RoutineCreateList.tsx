import React, { useEffect, useState } from 'react';
import { RoutineType } from '../RoutineType';
import dayjs from 'dayjs';
import { RoutineDeleteButtons } from './RoutineDeleteButtons';
import { RoutineEditButtons } from './RoutineEditButtons';

interface RoutineCreateListProps {
  categoryIndex: number;
  categoryColor:string
}

export const RoutineCreateList: React.FC<RoutineCreateListProps> = ({ categoryIndex,categoryColor }) => {
  const [localRoutine, setLocalRoutine] = useState<RoutineType[]>([]);
  const [filteredRoutine, setFilteredRoutine] = useState<RoutineType[]>([]);

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

  useEffect(() => {
    const filtered = localRoutine.filter(routine => routine.id === categoryIndex);
    setFilteredRoutine(filtered);
  }, [localRoutine, categoryIndex]);

  const handleDeleteRoutine = (indexToDelete: number) => {
    const updatedData = localRoutine.filter((item, index) => index !== indexToDelete);
    localStorage.setItem('routineData', JSON.stringify(updatedData));
    setLocalRoutine(updatedData);
  };

  const handleUpdateRoutineName = (index: number, newRoutineName: string) => {
    const updatedRoutines = localRoutine.map((routine, idx) =>
      idx === index ? { ...routine, routineName: newRoutineName } : routine
    );
    setLocalRoutine(updatedRoutines);
  };

  return (
    <div>
    {filteredRoutine.length > 0 ? (
      filteredRoutine.map((routine, index) => (
        <div key={index}>

          <div className='inline-flex justify-between items-center w-full '>

            <div
              style={{ borderColor: categoryColor }}
              className='border-2 border-solid p-2 m-2 rounded-full inline-block'>
            </div>
            <div className='text-center m-2 text-lg font-extrabold'>
              {routine.routineName}
            </div>

            <div className='ml-auto flex w-500 '>
              <div className='inline-flex space-x-2'>
                <RoutineEditButtons
                  initialRoutineName={routine.routineName}
                  onUpdateRoutineName={(newRoutineName) => handleUpdateRoutineName(index, newRoutineName)}
                  routineIndex = {routine.index}
                />
                <RoutineDeleteButtons idToDelete={index} onDelete={handleDeleteRoutine} />
                </div>
            </div>

          </div>

          <div className='ml-5 text-gray-400'>
            {routine.dateRange.map(date => date ? dayjs(date).format('YYYY-MM-DD') : 'N/A').join(' ~ ')}
          </div>
        </div>
      ))
    ) : (
      <div className='font-extrabold text-gray-400'>루틴이 없습니다.</div>
    )}
  </div>
);
};
