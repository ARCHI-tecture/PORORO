import {
  TextField,
  Grid,
  IconButton,
  Button,
  Menu,
  Typography,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CirclePicker, ColorResult } from 'react-color';
import { useEffect, useRef, useState } from 'react';
import { Category } from '../type';

interface EditCategoryPropsType {
  color: string;
  categoryArr: Category[];
  idx: number;
  cate: Category;
  setEditIdx: React.Dispatch<React.SetStateAction<number>>;
}

const EditCategory: React.FC<EditCategoryPropsType> = ({
  color,
  categoryArr,
  idx,
  cate,
  setEditIdx,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editedColor, setEditedColor] = useState<string>(cate.color);
  const [editedCategory, setEditedCategory] = useState<string>('');

  const sameEditedCategoryAlert = useRef<HTMLDivElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleChangeComplete = (color: ColorResult) => {
    setEditedColor(color.hex);
    setAnchorEl(null);
  };

  const submitEditedCategory = () => {
    if (
      categoryArr.some((cate: any) => cate.category === editedCategory) &&
      sameEditedCategoryAlert.current
    ) {
      sameEditedCategoryAlert.current.style.display = 'block';
    } else if (editedCategory) {
      cate.category = editedCategory;
      categoryArr[idx] = cate;
      localStorage.setItem('categoryArr', JSON.stringify(categoryArr));
      setEditIdx(-1);
    } else if (editedColor) {
      cate.color = editedColor;
      categoryArr[idx] = cate;
      localStorage.setItem('categoryArr', JSON.stringify(categoryArr));
      setEditIdx(-1);
    } else {
      setEditIdx(-1);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const editCategory = (cate: string) => {
    setEditedCategory(cate);
  };

  useEffect(() => {
    editCategory(editedCategory);
  }, [editedCategory]);

  return (
    <>
      <Grid
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          mt: 2,
          ml: 1,
        }}
      >
        <TextField
          id="standard-basic"
          label="카테고리 수정"
          defaultValue={cate.category}
          variant="standard"
          InputLabelProps={{
            sx: {
              fontSize: 20,
              color: 'lightgray',
            },
          }}
          InputProps={{
            sx: {
              fontSize: 20,
              pt: 0.5,
              pb: 0.5,
            },
          }}
          sx={{ width: '90%', mb: 2 }}
          onChange={(e: any) => {
            editCategory(e.target.value);
          }}
        />
        <Grid
          sx={{ display: ' flex', ml: -6 }}
          id="basic-button"
          aria-controls={menuOpen ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={menuOpen ? 'true' : undefined}
          onClick={handleClick}
        >
          <IconButton
            aria-label="color"
            sx={{ padding: 0, color: editedColor }}
          >
            <CircleIcon />
          </IconButton>
          <IconButton color="inherit" sx={{ padding: 0, color: 'lightgray' }}>
            <ArrowDropDownIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Grid>
        <Button
          variant="contained"
          sx={{
            width: 50,
            height: 40,
            color: 'black',
            backgroundColor: 'lightgray',
          }}
          onClick={submitEditedCategory}
        >
          등록
        </Button>
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
      <Typography
        ref={sameEditedCategoryAlert}
        sx={{ ml: 1, color: 'red', display: 'none' }}
      >
        같은 카테고리가 있습니다!
      </Typography>
    </>
  );
};

export default EditCategory;
