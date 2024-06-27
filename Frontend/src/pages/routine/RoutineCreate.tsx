import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { PeriodType } from './RoutineType';
import { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';

export const RoutineCreate = () => {
  const navigate = useNavigate();

  const periodOptions: PeriodType[] = [
    { value: '매일', label: '매일' },
    { value: '매주', label: '매주' },
    { value: '매월', label: '매월' },
  ];

  const [routineName, setRoutineName] = useState<string>('');
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [period, setPeriod] = useState<string>('매일');

  const handleRoutineNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoutineName(event.target.value);
  };

  const handleDateRangeChange = (newDateRange: [Dayjs | null, Dayjs | null]) => {
    setDateRange(newDateRange);
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeriod(event.target.value);
  };

  const handleSave = () => {
    const routineData = {
      routineName,
      dateRange,
      period,
    };

    // 기존 데이터 가져오기
    const existingData = localStorage.getItem('routineData');
    let updatedData = [];

    if (existingData) {
      try {
        updatedData = JSON.parse(existingData);
        if (!Array.isArray(updatedData)) {
          updatedData = [];
        }
      } catch (error) {
        console.error('Error parsing existing data:', error);
        updatedData = [];
      }
    }

    // 새로운 데이터 추가
    updatedData.push(routineData);

    // 로컬 스토리지에 저장
    localStorage.setItem('routineData', JSON.stringify(updatedData));

    console.log('Saved data:', JSON.stringify(updatedData)); // 저장된 데이터 콘솔에 출력

    navigate('/routine');
  };

  return (
    <>
      <h1>루틴</h1>
      <Box>
        <TextField
          id="standard-basic"
          label="루틴입력"
          variant="standard"
          value={routineName}
          onChange={handleRoutineNameChange}
        />

        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker']}>
              <DateRangePicker
                localeText={{ start: 'Check-in', end: 'Check-out' }}
                value={dateRange}
                onChange={handleDateRangeChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div>
          <label htmlFor="routineRepeat">반복</label>
          <TextField
            id="standard-select-currency"
            select
            value={period}
            onChange={handlePeriodChange}
            variant="standard"
          >
            {periodOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>

      </Box>
    </>
  );
};
