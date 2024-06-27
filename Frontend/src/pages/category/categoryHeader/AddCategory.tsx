import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [category, setCategory] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isDesktop ? 500 : 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const sameCategoryAlert = useRef<HTMLDivElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleChangeComplete = (color: ColorResult) => {
    setColor(color.hex);
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
      sameCategoryAlert.current.style.display = 'block';
      return false;
    }

    if (categoryArr && category) {
      const newCategoryArr = [...categoryArr, { category, color }];
      localStorage.setItem('categoryArr', JSON.stringify(newCategoryArr));
      setCategoryArr(newCategoryArr);
      setOpen(false);
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
        <Box sx={modalStyle}>
          <Box sx={{ width: '100%', height: 400 }}>
            <Grid
              sx={{
                display: 'flex',
                justifyContent: isDesktop ? 'space-between' : 'flex-start',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <IconButton
                aria-label="back"
                color="inherit"
                sx={{ mr: isDesktop ? 0 : 12 }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <Typography
                variant="h5"
                sx={{ fontWeight: 'bold', fontSize: 20 }}
              >
                카테고리 등록
              </Typography>
              <Button
                variant="text"
                color="inherit"
                sx={{ fontSize: 18, display: isDesktop ? 'block' : 'none' }}
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
                sx: {
                  fontSize: 20,
                },
              }}
              InputProps={{
                sx: {
                  fontSize: 20,
                  pt: 0.5,
                  pb: 0.5,
                },
              }}
              sx={{ width: '100%', mb: 1 }}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <Typography
              ref={sameCategoryAlert}
              sx={{ display: 'none', color: 'red', mb: 1 }}
            >
              같은 카테고리가 있습니다!
            </Typography>
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                mt: 1,
              }}
            >
              <Grid
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  mt: 1,
                }}
              >
                <Typography sx={{ fontSize: 20 }}>색상</Typography>
                <Grid>
                  <IconButton
                    aria-label="color"
                    sx={{ padding: 0, color: color }}
                    id="basic-button"
                    aria-controls={menuOpen ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={menuOpen ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    <CircleIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    sx={{ padding: 0, color: 'lightgray' }}
                  >
                    <ArrowDropDownIcon sx={{ fontSize: 28 }} />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid>
                <Menu
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
                  sx={{ mt: 1.2 }}
                >
                  <CirclePicker
                    width="600"
                    color={color}
                    onChangeComplete={handleChangeComplete}
                  />
                </Menu>
              </Grid>
            </Grid>
            {!isDesktop && (
              <Button
                sx={{
                  width: '50%',
                  backgroundColor: '#FCE73C',
                  color: 'black',
                  m: 12,
                }}
                onClick={addCategory}
              >
                등록
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddCategory;
