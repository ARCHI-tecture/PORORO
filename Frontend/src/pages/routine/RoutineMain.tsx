import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryType } from './RoutineType';

import { RoutineCreateList } from './RoutineCreateList';
import { RoutineCategoryList } from './RoutineCategoryList';



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


      </div>
    </>
  );
};

export default RoutineMain;
