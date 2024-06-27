import {
  Box,
  Button,
  Grid,
  IconButton,
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
import { Category } from './CategoryMain';

interface AddCategoryPropsType {
  open: boolean;
  handleClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categoryArr: Category[];
  setCategoryArr: React.Dispatch<React.SetStateAction<Category[]>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const AddCategory: React.FC<AddCategoryPropsType> = ({
  open,
  setOpen,
  handleClose,
  categoryArr,
  setCategoryArr,
  color,
  setColor,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [category, setCategory] = useState('');

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
