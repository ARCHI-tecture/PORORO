import React from 'react';
import TimerHeader from './TimerHeader';
import PomodoroTimer from './PomodoroTimer';

const TimerMain: React.FC = () => {
  return (
    <>
      <TimerHeader />
      <PomodoroTimer workDuration={3} breakDuration={2} />
    </>
  );
};

export default TimerMain;
