import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TimerIcon from '@mui/icons-material/Timer';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const ButtonContainer = styled.button`
  display: flex;
  gap: 20px;
  position: absolute;
  top: 30px;
  right: 30px;
`;

const Buttons: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleTimerClick = () => {
    navigate('/pomodoro'); // Navigate to the timer screen
  };

  const handleOpen = () => {
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  const handleCategory = () => {
    console.log('Option 1 clicked');
    handleClose();
  };

  const handleRoutine = () => {
    console.log('Option 2 clicked');
    handleClose();
  };

  return (
    <>
      <ButtonContainer>
        <div onClick={handleTimerClick}>
          <TimerIcon />
        </div>
        <div onClick={handleOpen}>
          <LinearScaleIcon />
        </div>
      </ButtonContainer>

      <Modal open={open} onClose={handleClose}>
        <Paper
          style={{
            padding: '20px',
            borderRadius: '8px',
            outline: 'none',
            width: '200px',
            position: 'absolute',
            top: '60px', // 버튼 아래로 위치 조정
            right: '30px',
            transform: 'translateY(0)', // 위치 조정
          }}
        >
          <Button
            onClick={handleCategory}
            variant="text"
            color="primary"
            style={{ marginRight: '10px' }}
          >
            카테고리
          </Button>
          <Button onClick={handleRoutine} variant="text" color="secondary">
            루틴
          </Button>
        </Paper>
      </Modal>
    </>
  );
};

export default Buttons;
