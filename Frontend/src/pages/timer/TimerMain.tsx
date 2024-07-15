import React, { useEffect, useState } from 'react';
import TimerHeader from './TimerHeader';
import PomodoroTimer from './PomodoroTimer';
import { Grid } from '@mui/material';

const TimerMain: React.FC = () => {
  const [backgroundStyle, setBackgroundStyle] = useState<React.CSSProperties>(
    {},
  );

  useEffect(() => {
    const bgOption = localStorage.getItem('bgOption');
    const bgValue = localStorage.getItem('bgValue');

    if (bgOption === 'none' || bgOption === 'white' || bgOption === 'dark') {
      setBackgroundStyle({
        backgroundColor: bgValue || '#ffffff',
        minHeight: '100vh',
      });
    } else if (bgOption === 'image') {
      setBackgroundStyle({
        backgroundImage: `url(${bgValue})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      });
    }
  }, []);

  return (
    <div style={backgroundStyle}>
      <Grid className="container flex flex-col items-center w-screen p-6">
        <TimerHeader />
        <PomodoroTimer workDuration={30} breakDuration={2} />
      </Grid>
    </div>
  );
};

export default TimerMain;
