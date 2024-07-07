import React from 'react';
import TimerHeader from './TimerHeader';
import PomodoroTimer from './PomodoroTimer';
import { Grid } from '@mui/material';

const TimerMain: React.FC = () => {
  return (
    <>
      <Grid className="container flex flex-col items-center w-screen p-6">
        <TimerHeader />
        <PomodoroTimer workDuration={3} breakDuration={2} />
      </Grid>
    </>
  );
};

export default TimerMain;
