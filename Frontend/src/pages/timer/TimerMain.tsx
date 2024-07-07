import React, { useEffect, useState } from 'react';
import TimerHeader from './TimerHeader';
import PomodoroTimer from './PomodoroTimer';
import { Grid } from '@mui/material';

const TimerMain: React.FC = () => {
  const [wallpaper, setWallpaper] = useState<string | null>(null);

  useEffect(() => {
    const savedWallpaper = localStorage.getItem('wallpaper');
    setWallpaper(savedWallpaper);
  }, []);

  const getBackgroundStyle = () => {
    switch (wallpaper) {
      case 'none':
        return { backgroundColor: '#f3f4f6' }; // gray-100
      case 'white':
        return { backgroundColor: '#ffffff' }; // white
      case 'dark':
        return { backgroundColor: '#1f2937' }; // gray-800
      default:
        return wallpaper
          ? {
              backgroundImage: `url(${wallpaper})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {};
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundStyle()}`}>
      <Grid className="container flex flex-col items-center w-screen p-6">
        <TimerHeader />
        <PomodoroTimer workDuration={3} breakDuration={2} />
      </Grid>
    </div>
  );
};

export default TimerMain;
