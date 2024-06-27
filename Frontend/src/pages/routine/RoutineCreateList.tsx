import React, { useEffect, useState } from 'react'
import { RoutineType, RoutineTypeonlyRoutineName } from './RoutineType';
import dayjs from 'dayjs';

export const RoutineCreateList = () => {


  const [localRoutine, setLocalRoutine] = useState<RoutineType[]>([]);

  useEffect(()=>{
    try{
      const routineDatas = localStorage.getItem('routineData');
      if(routineDatas){
        const parsedRoutine:RoutineType[] = JSON.parse(routineDatas);
        setLocalRoutine(parsedRoutine)
        console.log(parsedRoutine);
        console.log(routineDatas);
        console.log(localRoutine);
      }
    }catch (error) {
      console.error('루틴 데이터를 불러오는 도중 오류가 발생했습니다:', error);
    }
  },[])




  return (
    <div>
      {localRoutine.length > 0 ? (
        localRoutine.map((routine, index) => (
          <div key={index}>
            <div>{routine.routineName}</div>
            <div>
              {routine.dateRange.map(date => date ? dayjs(date).format('YYYY-MM-DD') : 'N/A').join(' ~ ')}
            </div>
          </div>
        ))
      ) : (
        <div>루틴이 없습니다.</div>
      )}
    </div>
  )
}
