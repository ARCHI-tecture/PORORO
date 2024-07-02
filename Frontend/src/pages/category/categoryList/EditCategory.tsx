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
  const [isVisible, setIsVisible] = useState(false);

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
      setIsVisible(true);
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
      <Grid className="w-full flex items-center mt-2 ml-1">
        <TextField
          className="w-full mb-2"
          id="standard-basic"
          label="카테고리 수정"
          defaultValue={cate.category}
          variant="standard"
          InputLabelProps={{
            className: 'text-xl text-gray-300',
          }}
          InputProps={{
            className: 'text-xl pt-1 pb-1',
          }}
          onChange={(e: any) => {
            editCategory(e.target.value);
          }}
        />
        <Grid
          className="flex -ml-11"
          id="basic-button"
          aria-controls={menuOpen ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={menuOpen ? 'true' : undefined}
          onClick={handleClick}
        >
          <IconButton
            className="p-0"
            aria-label="color"
            sx={{ color: editedColor }}
          >
            <CircleIcon />
          </IconButton>
          <IconButton color="inherit" className="p-0 text-gray-300">
            <ArrowDropDownIcon className="text-3xl" />
          </IconButton>
        </Grid>
        <Button
          className="h-10 text-black bg-gray-300"
          variant="contained"
          onClick={submitEditedCategory}
        >
          등록
        </Button>
      </Grid>
      <Grid>
        <Menu
          className="mt-3"
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
            className: 'flex items-center w-72 h-40 pl-5 ',
          }}
        >
          <CirclePicker
            width="600"
            color={color}
            onChangeComplete={handleChangeComplete}
          />
        </Menu>
      </Grid>
      <Typography
        className={`ml-1 text-red-500 ${isVisible ? 'block' : 'hidden'}`}
        ref={sameEditedCategoryAlert}
      >
        같은 카테고리가 있습니다!
      </Typography>
    </>
  );
};

export default EditCategory;
