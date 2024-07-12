import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const RecordTime: React.FC = () => {
  const boxStyle =
    'shadow-md w-28 md:w-1/5 h-32 rounded-md mr-1 md:mr-3 pl-1 pt-4 max-w-80';

  const typoStyle = 'text-xs md:text-lg font-bold whitespace-nowrap';
  const timeColor = 'text-red-500 text-2xl md:text-4xl mr-1';

  const timeTableData: any = localStorage.getItem('timeTable');
  const parsedTimeTable = JSON.parse(timeTableData);

  const getAverageTime = () => {
    return getTotalTime(parsedTimeTable) / parsedTimeTable.length;
  };

  const getTodayTotalTime = () => {
    const today = new Date();

    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const parts = formatter.formatToParts(today);
    const formattedDate = `${parts[0].value.slice(2)}-${parts[2].value}-${
      parts[4].value
    }`;

    const todayDate = parsedTimeTable.filter(
      (table: any) => table.date === formattedDate,
    );

    return getTotalTime(todayDate);
  };

  const getTotalTime = (table: any) => {
    const subMinutes = table.map((data: any) => {
      const startMinutes = parseInt(data.time.split('-')[0].split(':')[1]);
      const endMinutes = parseInt(data.time.split('-')[1].split(':')[1]);

      return endMinutes - startMinutes >= 0
        ? endMinutes - startMinutes
        : 60 - startMinutes + endMinutes;
    });
    const totalMinutes = subMinutes.reduce(
      (acc: number, current: number) => acc + current,
      0,
    );

    return totalMinutes;
  };

  const [averageTime, setAverageTime] = useState(getAverageTime());
  const [todayTime, setTodayTime] = useState(getTodayTotalTime());
  const [totalTime, setTotalTime] = useState(getTotalTime(parsedTimeTable));

  useEffect(() => {
    getTotalTime(parsedTimeTable);
    getTodayTotalTime();
    getAverageTime();
  }, []);

  const showHighlightTime = (time: number) => {
    return time && time >= 60 ? (
      <Grid className="flex items-end whitespace-nowrap">
        <Typography className={timeColor}>{Math.floor(time / 60)}</Typography>
        <Typography className="text-black mr-2">시간</Typography>
        <Typography className={timeColor}>{time % 60}</Typography>
        <Typography className="text-black">분</Typography>
      </Grid>
    ) : (
      <Grid className="flex items-end">
        <Typography className={timeColor}>{time}</Typography>
        <Typography className="text-black">분</Typography>
      </Grid>
    );
  };

  return (
    <Grid className="flex md:w-screen mb-4 xl:items-center xl:justify-center">
      <Box className={boxStyle}>
        <Typography className={typoStyle}>뽀모도로 평균 시간</Typography>
        <Typography className="flex justify-center items-end">
          {showHighlightTime(averageTime)}
        </Typography>
      </Box>
      <Box className={boxStyle}>
        <Typography className={typoStyle}>뽀모도로 하루 총 시간</Typography>
        <Typography className="flex justify-center">
          {showHighlightTime(todayTime)}
        </Typography>
      </Box>
      <Box className={boxStyle}>
        <Typography className={typoStyle}>뽀모도로 총 시간</Typography>
        <Typography className="flex justify-center">
          {showHighlightTime(totalTime)}
        </Typography>
      </Box>
    </Grid>
  );
};

export default RecordTime;
