import React, { useEffect, useState } from 'react';
import { RoutineType } from '../RoutineType';
import dayjs from 'dayjs';
import { RoutineDeleteButtons } from './RoutineDeleteButtons';
import { RoutineEditButtons } from './RoutineEditButtons';

interface RoutineCreateListProps {
  categoryIndex: number;
  categoryColor: string;
}

export const RoutineCreateList: React.FC<RoutineCreateListProps> = ({ categoryIndex, categoryColor }) => {
  const [localRoutine, setLocalRoutine] = useState<RoutineType[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);

  // 루틴 이름을 업데이트하는 코드입니다
  const handleUpdateRoutineName = (routineIndex: number, newRoutineName: string) => {
    console.log('업데이트전', localRoutine);

    // 새로운 상태를 업데이트하기 위해 현재 localRoutine을 복제합니다.
    const updatedRoutines = localRoutine.map((routine) =>
      routine.index === routineIndex ? { ...routine, routineName: newRoutineName } : routine
    );

    // 로컬 스토리지에서 기존 데이터를 가져옵니다.
    const routineDataString = localStorage.getItem('routineData');
    if (routineDataString) {
      try {
        // 기존 데이터를 파싱합니다.
        const parsedRoutine: RoutineType[] = JSON.parse(routineDataString);

        // 업데이트할 루틴의 인덱스를 찾습니다.
        const indexToUpdate = parsedRoutine.findIndex((routine) => routine.index === routineIndex);

        // 새로운 데이터로 업데이트합니다.
        if (indexToUpdate !== -1) {
          parsedRoutine[indexToUpdate].routineName = newRoutineName;
        }

        // 로컬 스토리지에 업데이트된 데이터를 반영합니다.
        localStorage.setItem('routineData', JSON.stringify(parsedRoutine));
      } catch (error) {
        console.error('Error updating routine data:', error);
      }
    }

    console.log('업데이트후', updatedRoutines);

    // 상태를 업데이트합니다.
    setLocalRoutine(updatedRoutines);
  };

  // 처음 데이터를 가져오는 동시에 각 카데고리별 루틴을 필터링합니다
  useEffect(() => {
    try {
      const routineDatas = localStorage.getItem('routineData');
      if (routineDatas) {
        const parsedRoutine: RoutineType[] = JSON.parse(routineDatas);

        // 현재 카테고리에 속하는 루틴만 필터링합니다.
        const filtered = parsedRoutine.filter(routine => routine.id === categoryIndex);
        setLocalRoutine(filtered);
      }
    } catch (error) {
      console.error('루틴 데이터를 불러오는 도중 오류가 발생했습니다:', error);
    }
  }, [categoryIndex]);

  return (
    <div>
      {localRoutine.length > 0 ? (
        localRoutine.map((routine, index) => (
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
                    onUpdateRoutineName={(newRoutineName) => handleUpdateRoutineName(routine.index, newRoutineName)}
                    isEditing={isEditing === routine.index}
                    setIsEditing={(isEditing) => setIsEditing(isEditing ? routine.index : null)}
                  />
                  <RoutineDeleteButtons
                    idToDelete={routine.index}
                    localRoutine={localRoutine}
                    setLocalRoutine={setLocalRoutine}
                    categoryIndex={categoryIndex}
                  />
                </div>
              </div>
            </div>

            <div className='ml-5 text-gray-400'>
              {routine.dateRange.map(date => date ? dayjs(date).format('YYYY-MM-DD') : 'N/A').join(' ~ ')}
            </div>

            {isEditing === routine.index && (
              <div className='ml-5'>
                <input
                  className='border-b-2 border-black w-full mt-2'
                  type="text"
                  value={routine.routineName}
                  onChange={(e) => handleUpdateRoutineName(routine.index, e.target.value)}
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <div className='font-extrabold text-gray-400'>루틴이 없습니다.</div>
      )}
    </div>
  );
};
