import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const TimerHeader: React.FC = () => {
  const navigate = useNavigate();

  // 옵션 메뉴의 열리고 닫힌 상태
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 이전 버튼 클릭 시 메인 페이지로 이동
  const handleHomeNavigate = (): void => {
    navigate('/');
  };

  // 옵션 메뉴 클릭 시 오픈
  const toggleMenu = () => {
    setOpen(!open);
  };

  // 옵션 메뉴의 옵션 클릭시 해당 페이지로 이동
  const handleMenuNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  // 옵션 메뉴 바깥 영역 클릭 시 메뉴 닫힘
  const handleClickMenuOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickMenuOutside);
    } else {
      document.removeEventListener('mousedown', handleClickMenuOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickMenuOutside);
    };
  }, [open]);

  return (
    <>
      <Grid className="flex justify-between w-4/5 max-w-5xl min-w-xs">
        <IconButton
          aria-label="back"
          color="inherit"
          onClick={() => {
            handleHomeNavigate();
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <IconButton color="inherit" onClick={toggleMenu}>
          <MoreHorizIcon className="text-3xl" />
        </IconButton>
      </Grid>
      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-0 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          <ul className="py-1">
            <li>
              <button
                className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                onClick={() => handleMenuNavigate('/#')}
              >
                배경화면 설정
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default TimerHeader;
