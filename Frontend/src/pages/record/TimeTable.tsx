import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
const TimeTable: React.FC = () => {
  const tableCellStyle = 'w-20 border border-gray-300 min-w-5';

  const hourData = [
    '0:00',
    '2:00',
    '4:00',
    '6:00',
    '8:00',
    '10:00',
    '12:00',
    '14:00',
    '16:00',
    '18:00',
    '20:00',
    '22:00',
  ];

  const getLastTwoWeeks = () => {
    const dateData: any = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);

      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      const parts = formatter.formatToParts(date);
      const formattedDate = `${parts[0].value}-${parts[2].value}-${parts[4].value}T${parts[6].value}:${parts[8].value}:${parts[10].value}+09:00`;

      console.log(formattedDate.split('T')[0]);
      dateData.push(formattedDate.split('T')[0]);
    }

    setDates(dateData);
  };

  useEffect(() => {
    getLastTwoWeeks();
  }, []);

  const [dates, setDates] = useState([]);

  return (
    <Grid className="w-full shadow-md pt-5 pl-2 pb-5 mb-5 rounded-md max-w-384">
      <Box className="h-full max-w-320 min-w-160">
        <Typography className="font-bold text-xl">뽀모도로 기록</Typography>
        <TableContainer className="w-full md:w-5/6 relative">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="border-none"></TableCell>
                {hourData.map((time: string, index: number) => (
                  <>
                    <TableCell
                      className="table-cell md:hidden border-none p-0"
                      key={index}
                    >
                      <Typography className="text-xs -ml-7">
                        {parseInt(time.split(':')[0]) % 4 === 0 && time}
                      </Typography>
                    </TableCell>
                    <TableCell className="hidden md:table-cell border-none p-0">
                      {time}
                    </TableCell>
                  </>
                ))}
              </TableRow>
              {dates.map((date: string, index) => (
                <>
                  <TableRow>
                    <Typography className="border-none whitespace-nowrap text-2xs p-0 pr-1 md:text-base">
                      {date.split('-')[1][0] === '0'
                        ? `${date.split('-')[1]}월 ${date.split('-')[2]}일`
                        : `${date.split('-')[1]}월 ${date.split('-')[2]}일`}
                    </Typography>
                    <TableCell className={`${tableCellStyle} `}></TableCell>
                    <TableCell className={tableCellStyle}></TableCell>
                    <TableCell className={tableCellStyle}></TableCell>
                    <TableCell className={tableCellStyle}></TableCell>
                    <TableCell className={tableCellStyle}></TableCell>
                    <TableCell className={tableCellStyle}></TableCell>
                    <TableCell className={tableCellStyle}></TableCell>
                    <TableCell className={tableCellStyle}></TableCell>
                    <TableCell className={tableCellStyle}></TableCell>
                    <TableCell className={tableCellStyle}></TableCell>
                    <TableCell
                      className={`${tableCellStyle} hidden md:table-cell `}
                    ></TableCell>
                    <TableCell
                      className={`${tableCellStyle} hidden md:table-cell`}
                    ></TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
};

export default TimeTable;
