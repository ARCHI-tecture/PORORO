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
import ReactDatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";

export const RoutineCreate: React.FC = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());


  // 로컬 스토리지에서 categoryIndex를 가져옴
  const categoryIndex = Number(localStorage.getItem('categoryIndex'));

  const periodOptions: PeriodType[] = [
    { value: '매일', label: '매일' },
    { value: '매주', label: '매주' },
    { value: '매월', label: '매월' },
  ];

  const [routineName, setRoutineName] = useState<string>('');
  const [dateRange, setDateRange] = useState<[typeof startDate | null, typeof endDate | null]>([null, null]);
  const [period, setPeriod] = useState<string>('매일');

  const handleRoutineNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoutineName(event.target.value);
  };

  const handleDateRangeChange = (newDateRange: [typeof startDate | null, typeof endDate | null]) => {
    setDateRange(newDateRange);
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeriod(event.target.value);
  };

  const handleSave = () => {
    const routineData = {
      id: categoryIndex,
      routineName,
      dateRange,
      period,
    };

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

    updatedData.push(routineData);
    localStorage.setItem('routineData', JSON.stringify(updatedData));

    console.log('Saved data:', JSON.stringify(updatedData));

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
          <ReactDatePicker
		        selected={startDate}
            onChange={(date) => handleDateRangeChange([startDate, date])}

          />
          <ReactDatePicker
            selected={endDate}
            onChange={(date) => handleDateRangeChange([endDate, date])}

          />


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
