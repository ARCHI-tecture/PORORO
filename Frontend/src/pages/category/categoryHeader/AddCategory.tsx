import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  Modal,
  TextField,
  Typography,
} from '@mui/material';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useRef, useState } from 'react';
import { CategoryHeaderPropsType } from '../type';
import { CirclePicker, ColorResult } from 'react-color';

const AddCategory: React.FC<CategoryHeaderPropsType> = ({
  color,
  categoryArr,
  handleClose,
  open,
  setColor,
  setCategoryArr,
  setOpen,
}) => {
  const [category, setCategory] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const sameCategoryAlert = useRef<HTMLDivElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleChangeComplete = (color: ColorResult) => {
    setColor(color.hex);
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const addCategory = () => {
    if (
      categoryArr?.some((cate: any) => cate.category === category) &&
      sameCategoryAlert.current
    ) {
      setIsVisible(true);
      return false;
    }

    if (categoryArr && category) {
      const newCategoryArr = [...categoryArr, { category, color }];
      localStorage.setItem('categoryArr', JSON.stringify(newCategoryArr));
      setCategoryArr(newCategoryArr);
      setOpen(false);
      setIsVisible(false);
      setCategory('');
      setColor('red');
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 shadow-2xl bg-gray-50 w-80 md:w-128">
          <Box className="w-full h-96">
            <Grid className="flex items-center mb-2 justify-start md:justify-between">
              <IconButton
                aria-label="back"
                color="inherit"
                className="mr-7 md:mr-0"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <Typography variant="h5" className="font-bold text-xl ">
                카테고리 등록
              </Typography>
              <Button
                variant="text"
                color="inherit"
                className={`text-lg hidden md:block`}
                onClick={addCategory}
              >
                완료
              </Button>
            </Grid>

            <TextField
              id="standard-basic"
              label="카테고리 입력"
              value={category}
              variant="standard"
              InputLabelProps={{
                className: 'text-xl',
              }}
              InputProps={{
                className: 'text-xl pt-1 pb-1',
              }}
              className="w-full mb-1"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <Typography
              ref={sameCategoryAlert}
              className={` text-red-500 mb-1 ${isVisible ? 'block' : 'hidden'}`}
            >
              같은 카테고리가 있습니다!
            </Typography>
            <Grid className="flex flex-col items-center cursor-pointer mt-1">
              <Grid
                className="w-full flex justify-between items-center cursor-pointer mt-2"
                id="basic-button"
                aria-controls={menuOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? 'true' : undefined}
                onClick={handleClick}
              >
                <Typography className="text-xl">색상</Typography>
                <Grid>
                  <IconButton
                    aria-label="color"
                    className="p-0"
                    sx={{ color: color }}
                  >
                    <CircleIcon />
                  </IconButton>
                  <IconButton color="inherit" className="p-0 text-gray-300">
                    <ArrowDropDownIcon className="text-3xl" />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid>
                <Menu
                  className="mt-2"
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  PaperProps={{
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      width: 300,
                      height: 150,
                      padding: '10px 0 10px 10px',
                    },
                  }}
                >
                  <CirclePicker
                    width="600"
                    color={color}
                    onChangeComplete={handleChangeComplete}
                  />
                </Menu>
              </Grid>
            </Grid>

            <Button
              className="w-1/2 bg-mainYellow m-12 text-black md:hidden block"
              onClick={addCategory}
            >
              등록
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddCategory;
