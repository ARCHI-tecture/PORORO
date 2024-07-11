import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';

const RecordTime: React.FC = () => {
  const boxStyle =
    'shadow-md w-28 md:w-1/5 h-32 rounded-md mr-1 md:mr-3 pl-1 pt-4 max-w-80';

  const typoStyle = 'text-xs md:text-lg font-bold whitespace-nowrap';

  const [averageTime, setAverageTime] = useState(0);
  const [todayTime, setTodayTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  return (
    <Grid className="flex md:w-screen mb-4 xl:items-center xl:justify-center">
      <Box className={boxStyle}>
        <Typography className={typoStyle}>뽀모도로 평균 시간</Typography>
        <Typography className="flex justify-center items-end">
          <Typography className="text-red-500 text-4xl mr-1">
            {averageTime}
          </Typography>
          분
        </Typography>
      </Box>
      <Box className={boxStyle}>
        <Typography className={typoStyle}>뽀모도로 하루 총 시간</Typography>
        <Typography className="flex justify-center items-end">
          <Typography className="text-red-500 text-4xl mr-1">
            {todayTime}
          </Typography>
          분
        </Typography>
      </Box>
      <Box className={boxStyle}>
        <Typography className={typoStyle}>뽀모도로 총 시간</Typography>
        <Typography className="flex justify-center items-end">
          <Typography className="text-red-500 text-4xl mr-1">
            {totalTime}
          </Typography>
          분
        </Typography>
      </Box>
    </Grid>
  );
};

export default RecordTime;
