import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { RoutineCategoryList } from './RoutineCategory/RoutineCategoryList';
import { IconButton } from '@mui/material';



const RoutineMain: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeNavigate = (): void => {
    navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center p-4">
  <div className='flex items-center w-[calc(100%-40px)] max-w-screen-md py-10'>
    <IconButton
      aria-label="back"
      color="inherit"
      onClick={handleHomeNavigate}
    >
      <ArrowBackIosIcon className='justify-start' />
    </IconButton>
    <h1 className="text-3xl flex-grow text-center font-extrabold">
      루틴관리
    </h1>
  </div>
  <div className='w-full max-w-screen-md '>
    <RoutineCategoryList />
  </div>
</div>
  );
};

export default RoutineMain;
