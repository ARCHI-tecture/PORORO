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
    '00:00',
    '02:00',
    '04:00',
    '06:00',
    '08:00',
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

      dateData.push(formattedDate.split('T')[0]);
    }

    setDates(dateData);
  };

  const loadTimeTableData = () => {
    const storedData = localStorage.getItem('timeTable');
    return storedData ? JSON.parse(storedData) : [];
  };

  const isTimeInRange = (date: string, hour: string) => {
    const record = timeTableData.find(
      (table: any) =>
        `${table.date.split('-')[1]}월 ${table.date.split('-')[2]}일` ===
          `${date.split('-')[1]}월 ${date.split('-')[2]}일` &&
        parseInt(table.time.split('-')[0].split(':')[0]) <=
          parseInt(hour.split(':')[0]) &&
        parseInt(table.time.split('-')[0].split(':')[0]) + 1 >=
          parseInt(hour.split(':')[0]),
    );

    return !!record;
  };

  useEffect(() => {
    getLastTwoWeeks();
    setTimeTableData(loadTimeTableData());

    // const timetb = [
    //   { date: '24-07-11', time: '11:00-11:25' },
    //   { date: '24-07-10', time: '12:00-12:25' },
    //   { date: '24-07-01', time: '18:00-18:25' },
    //   { date: '24-07-02', time: '13:00-13:25' },
    //   { date: '24-07-12', time: '11:50-12:15' },
    //   { date: '24-07-12', time: '13:00-13:25' },
    // ]; // 임시 데이터
  }, []);

  const [dates, setDates] = useState([]);
  const [timeTableData, setTimeTableData] = useState(loadTimeTableData());

  return (
    <Grid className="w-full pt-5 pb-5 pl-2 mb-5 rounded-md shadow-md max-w-384">
      <Box className="h-full max-w-320 min-w-160">
        <Typography className="text-xl font-bold">뽀모도로 기록</Typography>
        <TableContainer className="relative w-full md:w-5/6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="border-none"></TableCell>
                {hourData.map((time: string, index: number) => (
                  <>
                    <TableCell className="table-cell p-0 border-none md:hidden">
                      <Typography className="text-xs -ml-7">
                        {parseInt(time.split(':')[0]) % 4 === 0 && time}
                      </Typography>
                    </TableCell>
                    <TableCell className="hidden p-0 border-none md:table-cell">
                      {time}
                    </TableCell>
                  </>
                ))}
              </TableRow>
              {dates.map((date: string, index) => (
                <>
                  <TableRow>
                    <Typography className="p-0 pr-1 border-none whitespace-nowrap text-2xs md:text-base">
                      {date.split('-')[1][0] === '0'
                        ? `${date.split('-')[1]}월 ${date.split('-')[2]}일`
                        : `${date.split('-')[1]}월 ${date.split('-')[2]}일`}
                    </Typography>
                    {hourData.map((hour, index) => {
                      isTimeInRange(date, hour);
                      return (
                        <TableCell
                          className={`${tableCellStyle} ${
                            index === 10 || index === 11
                              ? 'hidden md:table-cell'
                              : ''
                          } // ${
                            isTimeInRange(date, hour) ? 'bg-blue-500' : ''
                          }`}
                          key={index}
                        ></TableCell>
                      );
                    })}
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
