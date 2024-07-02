import { Box, Grid, Typography } from '@mui/material';

const TimeTable: React.FC = () => {
  const boxStyle = 'shadow-md w-80 md:w-4/5 h-96 rounded-md p-5 min-w-80';
  return (
    <Grid>
      <Box className={boxStyle}>
        <Typography className="font-bold text-xl flex">
          뽀모도로 기록
        </Typography>
      </Box>
    </Grid>
  );
};

export default TimeTable;
