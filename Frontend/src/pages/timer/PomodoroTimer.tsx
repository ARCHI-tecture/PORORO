import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface TimerProps {
  workDuration: number;
  breakDuration: number;
}

const CircleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d1d5db; /* Tailwind's gray-300 */
  border-radius: 50%;
  width: 200px;
  height: 200px;
`;

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
    <div className="flex flex-col items-center mt-10">
      <CircleContainer>
        <div className="text-3xl font-semibold">{formatTime(timeLeft)}</div>
      </CircleContainer>
      {!hasStarted ? (
        <button
          onClick={handleStart}
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
        >
          시작
        </button>
      ) : (
        <div className="mt-4">
          <button
            onClick={handlePauseResume}
            className="px-4 py-2 mr-2 text-white bg-blue-500 rounded"
          >
            {isActive ? '일시정지' : '계속'}
          </button>
          {!isActive && hasStarted && (
            <button
              onClick={handleStop}
              className="px-4 py-2 text-white bg-red-500 rounded"
            >
              정지
            </button>
          )}
        </div>
      )}
      {timerEnded && (
        <button
          onClick={handleNextSession}
          className="px-4 py-2 mt-4 text-white bg-green-500 rounded"
        >
          다음 작업
        </button>
      )}
    </div>
  );
};

export default PomodoroTimer;
