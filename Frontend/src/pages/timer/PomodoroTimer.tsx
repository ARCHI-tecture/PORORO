import React, { useState, useEffect } from 'react';

interface TimerProps {
  workDuration: number;
  breakDuration: number;
}

const PomodoroTimer: React.FC<TimerProps> = ({
  workDuration,
  breakDuration,
}) => {
  // 초기 시간 설정
  const [timeLeft, setTimeLeft] = useState(workDuration);
  // 타이머 활성 여부
  const [isActive, setIsActive] = useState(false);
  // 타이머 시작 여부
  const [hasStarted, setHasStarted] = useState(false);
  // 작업 세션 <-> 휴식 세션 여부
  const [isWorkSession, setIsWorkSession] = useState(true);
  // 타이머 종료 여부
  const [timerEnded, setTimerEnded] = useState(false);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && hasStarted) {
      // 타이머가 0에 도달했을 때 세션 종료
      setTimerEnded(true);
      setIsActive(false);
    }
  }, [isActive, timeLeft, hasStarted]);

  const formatTime = (seconds: number) => {
    // 분/초 계산
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    // 타이머 형식 변경
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setHasStarted(true);
    setTimerEnded(false);
  };

  // 타이머 일시 중지 : 활성 상태 토글
  const handlePauseResume = () => {
    setIsActive(!isActive);
  };

  // 타이머 정지
  const handleStop = () => {
    setIsActive(false);
    setTimeLeft(isWorkSession ? workDuration : breakDuration);
    setHasStarted(false);
    setTimerEnded(false);
  };

  const handleNextSession = () => {
    if (isWorkSession) {
      setTimeLeft(breakDuration);
    } else {
      setTimeLeft(workDuration);
    }
    setIsWorkSession(!isWorkSession);
    setTimerEnded(false);
    setHasStarted(false);
    setIsActive(false);
  };

  return (
    <div>
      <div>{formatTime(timeLeft)}</div>
      {!hasStarted ? (
        <button onClick={handleStart}>시작</button>
      ) : (
        <div>
          <button onClick={handlePauseResume}>
            {isActive ? '일시정지' : '계속'}
          </button>
          {!isActive && hasStarted && (
            <button onClick={handleStop}>정지</button>
          )}
        </div>
      )}
      {timerEnded && <button onClick={handleNextSession}>다음 작업</button>}
    </div>
  );
};

export default PomodoroTimer;
