import React, { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { PeriodType } from '../RoutineType';
import { useNavigate } from 'react-router-dom';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton } from '@mui/material';
import { PiTildeBold } from "react-icons/pi";


export const RoutineCreate: React.FC = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startDatePickerOpen, setStartDatePickerOpen] = useState(false);
  const [endDatePickerOpen, setEndDatePickerOpen] = useState(false);

  const handleHomeNavigate = (): void => {
    navigate('/routine');
  };

  const categoryIndex = Number(localStorage.getItem('categoryIndex'));

  const periodOptions: PeriodType[] = [
    { value: '매일', label: '매일' },
    { value: '매주', label: '매주' },
    { value: '매월', label: '매월' },
  ];

  const [routineName, setRoutineName] = useState<string>('');
  const [period, setPeriod] = useState<string>('매일');
  //데이터에 index라는 번호를 추가해 고유의 번호를 부여(id는 카테고리인덱스와 연결하면서 이미 사용중)
  const [index, setIndex] = useState<number>(() => {
    const existingData = localStorage.getItem('routineData');
    if (existingData) {
      try {
        const parsedData = JSON.parse(existingData);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          return parsedData[parsedData.length - 1].index + 1;
        }
      } catch (error) {
        console.error('기존 데이터 파싱 중 오류 발생:', error);
      }
    }
    return 1;//인덱스 시작 번호
  });

  const handleRoutineNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoutineName(event.target.value);
  };

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeriod(event.target.value);
  };

  const handleSave = () => {
    setIndex(index + 1);

    //id는 각 카데고리의인덱스: 중복가능
    //index는 루틴 고유의 인덱스: 고유함
    const routineData = {
      index: index,
      id: categoryIndex,
      routineName,
      dateRange: [startDate, endDate],
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
        console.error('기존 데이터 파싱 중 오류 발생:', error);
        updatedData = [];
      }
    }

    updatedData.push(routineData);
    localStorage.setItem('routineData', JSON.stringify(updatedData));

    navigate('/routine');
  };

  return (
    <div className='flex flex-col justify-center items-center p-4'>
      <div className='flex justify-between items-center max-w-screen-md w-full py-10 mb-20'>
        <IconButton
          onClick={handleHomeNavigate}
          className='text-black'
        >
          <ArrowBackIosIcon />
        </IconButton>
        <h1 className='text-3xl text-center font-extrabold'>루틴</h1>
        <div className='w-12'></div>
      </div>

      <div className='text-sm md:w-full max-w-screen-sm mobile:w-400'>
        <div className='mb-10 w-full'>
          <TextField
            id="standard-basic"
            label="루틴입력"
            variant="standard"
            value={routineName}
            onChange={handleRoutineNameChange}
            className='w-full'
          />
        </div>

        <div className='w-full mb-10 flex justify-center items-center mobile:block p-4'>
          <div className='flex  items-center border border-solid border-2px border-subColor4 rounded-xl p-1 mr-2 mobile:mr-0'>
            <ReactDatePicker
              selected={startDate}
              onChange={(date) => handleDateRangeChange([date, endDate])}
              dateFormat="yyyy년 MM월 dd일"
              open={startDatePickerOpen}
              shouldCloseOnSelect={!startDatePickerOpen}
              onClickOutside={() => setStartDatePickerOpen(false)}
              onFocus={() => setStartDatePickerOpen(true)}
              className="text-center "
              minDate={new Date()}
            />
            <CalendarMonthIcon
              className="text-mainYellow ml-2"
              onClick={() => setStartDatePickerOpen(true)}
            />
          </div>

          <PiTildeBold className='m-2' />

          <div className='flex items-center border border-solid border-2px border-subColor4 rounded-xl p-1 text-center ml-2 mobile:ml-0'>
            <ReactDatePicker
              selected={endDate}
              onChange={(date) => handleDateRangeChange([startDate, date])}
              dateFormat="yyyy년 MM월 dd일"
              className='text-center '
              open={endDatePickerOpen}
              onClickOutside={() => setEndDatePickerOpen(false)}
              onFocus={() => setEndDatePickerOpen(true)}
              minDate={startDate || new Date()}
            />
            <CalendarMonthIcon
              className="text-mainYellow ml-2"
              onClick={() => setEndDatePickerOpen(true)}
            />
          </div>
        </div>

        <div className='flex justify-between mb-4'>
          <label
            htmlFor="routineRepeat"
            className='block mb-2 text-xl pl-4'>
            주기
          </label>
          <div
            className='pr-4 text-mainYellow'>
            <TextField
              id="standard-select-currency"
              select
              value={period}
              onChange={handlePeriodChange}
              variant="standard"
            >
              {periodOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>

        <div className='flex justify-center mt-40'>
          <Button
            onClick={handleSave}
            variant="contained"
            style={{ backgroundColor: '#FFD812', padding: '5px 70px', borderRadius: '20px' }}
          >
            등록
          </Button>
        </div>

      </div>
    </div>
  );
};
