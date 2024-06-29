import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const TimerHeader: React.FC = () => {
  const navigate = useNavigate();
  const handleHomeNavigate = (): void => {
    navigate('/');
  };

  return (
    <>
      <IconButton
        aria-label="back"
        color="inherit"
        onClick={() => {
          handleHomeNavigate();
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <IconButton color="inherit">
        <MoreHorizIcon />
      </IconButton>
    </>
  );
};

export default TimerHeader;
