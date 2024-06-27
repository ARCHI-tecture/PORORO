import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryType } from './RoutineType';
import { RoutineCategoryList } from './RoutineCategoryList';
import { RoutineCreateList } from './RoutineCreateList';


const RoutineMain: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeNavigate = (): void => {
    navigate('/');
  };

  return (
    <>
      <h1>루틴관리</h1>
      <button onClick={handleHomeNavigate}>
        &lt;
      </button>
      <div>
        <RoutineCategoryList/>
        <RoutineCreateList />
      </div>
    </>
  );
};

export default RoutineMain;
